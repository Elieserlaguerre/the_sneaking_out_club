import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Applicant from "@/app/lib/models/Applicant";
import LedgerEntry from "@/app/lib/models/LedgerEntry";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Teacher from "@/app/lib/models/Teacher";
import { processMemberLedgerEffects } from "@/app/lib/util/backend-helper-functions/ledger";
import { EVENT_COOLDOWNS, EVENT_TYPES, RATE_LIMITED_EVENTS, REPUTATION_WEIGHTS, sourceMapping } from "@/app/lib/util/backend-helper-functions/ledger/variables";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { entity, entityType, ledgerType, eventType, metadata, createdBy, createdByType } = data;

		/*
        ================
        EVENT VALIDATION
        ================
        */

		const validMapping = {
			reputation: Object.values(EVENT_TYPES).filter((e) => e !== "perk_awarded"),
			perk: ["perk_awarded"]
		};

		if (!validMapping[ledgerType]?.includes(eventType)) {
			throw new Error("Invalid eventType for this ledgerType");
		}

		const derivedSource = sourceMapping[eventType];

		if (!derivedSource) {
			throw new Error("Missing source mapping for eventType");
		}

		/*
        =================
        IDEMPOTENCY GAURD
        =================
        */

		const identityQuery = {
			entity,
			eventType,
			...(metadata?.assignmentId && { "metadata.assignmentId": metadata.assignmentId }),
			...(metadata?.eventId && { "metadata.eventId": metadata.eventId }),
			...(metadata?.idempotencyKey && { "metadata.idempotencyKey": metadata.idempotencyKey })
		};

		// STRICT uniqueness (for assignment/event specific actions)
		let existingStrict = null;

		if (metadata?.assignmentId || metadata?.eventId) {
			existingStrict = await LedgerEntry.findOne(identityQuery);
		}

		if (existingStrict) {
			return NextResponse.json({ message: "Duplicate event" }, { status: 429 });
		}

		if (RATE_LIMITED_EVENTS.includes(eventType)) {
			/*
            ====================================
            TIME-BASED SPAM PROTECTION (GENERIC)
            ====================================
            */
			const recent = await LedgerEntry.findOne({
				entity,
				eventType,
				createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
			});

			if (recent) {
				return NextResponse.json({ message: "Too many rapid actions" }, { status: 429 });
			}
		}

		/*
        ======================
        ANTI-GAMING PROTECTION
        ======================
        */

		const cooldown = EVENT_COOLDOWNS[eventType];

		if (cooldown) {
			const since = new Date(Date.now() - cooldown.windowMs);

			const count = await LedgerEntry.countDocuments({
				entity,
				eventType,
				createdAt: { $gte: since }
			});

			if (count >= cooldown.maxOccurrences) {
				return NextResponse.json({ message: "Cooldown limit reached for this action" }, { status: 429 });
			}
		}

		/*
        ====================
        ACTION AUTHORIZATION
        ====================
        */

		const authorizedDisciplinarians = ["Admin", "Parent"];

		const disciplineEvents = ["rule_violation", "integrity_breach"];

		if (disciplineEvents.includes(eventType) && !authorizedDisciplinarians.includes(createdByType)) {
			throw new Error("Only admins and parents can issue disciplinary actions.");
		}

		const gradeEvents = ["grade_above_b", "grade_below_b", "grade_assignment"];

		if (gradeEvents.includes(eventType) && createdByType !== "Teacher") {
			throw new Error("Only teachers can assign grades");
		}

		if (!entity || !entityType || !ledgerType || !eventType) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		/*
        ============================
        DETERMIN VALUE AUTOMATICALLY
        ============================
        */

		let value = 0;

		if (ledgerType === "reputation") {
			value = REPUTATION_WEIGHTS[eventType] ?? 0;
		}

		if (ledgerType === "perk") {
			value = metadata?.value ?? 0;
		}

		/*
        =======================
        PREVENT USELESS ENTRIES
        =======================
        */

		if (value === 0) return NextResponse.json({ message: "Invalid event type or zero value" }, { status: 400 });

		/*
        ================
        MODEL VALIDATION
        ================
        */

		const modelMap = {
			Member,
			Parent,
			Teacher,
			Admin,
			Applicant
		};

		const Model = modelMap[entityType];

		if (!Model) throw new Error("Invalid entity type");

		const exists = await Model.findById(entity);
		if (!exists) throw new Error("Entity not found");

		/*
        =====================
        LEDGER ENTRY CREATION
        =====================
        */

		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			const [entry] = await LedgerEntry.create(
				[
					{
						entity,
						entityType,
						ledgerType,
						eventType,
						source: derivedSource,
						value,
						metadata,
						createdBy,
						createdByType
					}
				],
				{ session }
			);

			if (entityType === "Member") {
				await processMemberLedgerEffects(entity, { session, entry });
			}

			await session.commitTransaction();

			return NextResponse.json({ results: entry, message: "Ledger entry created." }, { status: 201 });
		} catch (err) {
			if (err.code === 11000) {
				throw new Error("Duplicate event (race condition)");
			}
			await session.abortTransaction();
			throw err;
		} finally {
			session.endSession();
		}
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
