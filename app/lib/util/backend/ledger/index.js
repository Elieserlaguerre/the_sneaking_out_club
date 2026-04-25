import Member from "@/app/lib/models/Member";
import MemberSnapshot from "@/app/lib/models/MemberSnapshot";
import { DAY_MS, STREAK_EVENTS, SUSPENSION_DURATIONS } from "./variables";

/*
===========
CORE ENGINE
===========
*/

export async function processMemberLedgerEffects(memberId, { session, entry } = {}) {
	/*
    =========
    VARIABLES
    =========
    */

	const latestEntry = entry;

	/*
    ================
    1. COMPUTE STATE
    ================
    */

	if (!entry) {
		throw new Error("Ledger engine requires entry for incremental processing");
	}

	const snapshot = await MemberSnapshot.findOneAndUpdate(
		{ memberId },
		{
			$inc: {
				reputationScore: latestEntry.value,
				streak: STREAK_EVENTS.includes(latestEntry.eventType) ? 1 : 0
			},
			$set: {
				level,
				lastCalculatedAt: new Date()
			}
		},
		{ session }
	);

	if (!snapshot) {
		// Initialize fresh snapshot instead of rebuilding
		await MemberSnapshot.findOneAndUpdate(
			{ memberId },
			{
				$setOnInsert: {
					memberId,
					reputationScore: entry.value,
					level: calculateLevel(entry.value),
					streak: STREAK_EVENTS.includes(entry.eventType) ? 1 : 0,
					lastCalculatedAt: new Date()
				}
			},
			{
				upsert: true,
				new: true,
				session
			}
		);

		await handleStatusTransitions(memberId, entry.value, { session });
		return;
	}

	let reputationScore = snapshot?.reputationScore ?? 0;
	let streak = snapshot?.streak ?? 0;

	/*
    =======================
    APPLY ONLY LATEST ENTRY
    =======================
    */

	reputationScore += latestEntry.value;

	if (STREAK_EVENTS.includes(latestEntry.eventType)) {
		streak += 1;
	} else if (latestEntry.value < 0) {
		streak = 0;
	}

	/*
    ===============
    3. DERIVE LEVEL
    ===============
    */

	const level = calculateLevel(reputationScore);

	/*
    ==================
    4. UPSERT SNAPSHOT
    ==================
    */

	await MemberSnapshot.findOneAndUpdate(
		{ memberId },
		{
			reputationScore,
			level,
			streak,
			lastCalculatedAt: new Date()
		},
		{
			upsert: true,
			new: true,
			setDefaultsOnInsert: true,
			session
		}
	);

	/*
    =====================
    5. STATUS TRANSITIONS
    =====================
    */

	await handleStatusTransitions(memberId, reputationScore, { session });
}

async function handleStatusTransitions(memberId, reputationScore, { session }) {
	const member = await Member.findById(memberId).session(session);

	if (!member) return;

	const now = new Date();

	if (member.statusMeta?.suspensionEndDate > now) {
		return; // already suspended → do nothing
	}

	/*
    ==============
    PROBATION RULE
    ==============
    */

	if (reputationScore < -100 && !member.statusMeta?.isOnProbation && (!member.statusMeta?.probationEndDate || member.statusMeta.probationEndDate < now)) {
		await Member.updateOne(
			{ _id: memberId },
			{
				$set: {
					"statusMeta.isOnProbation": true,
					"statusMeta.currentStatusStartDate": now,
					"statusMeta.probationEndDate": new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
				}
			},
			{ session }
		);
	}

	/*
    ============================
    CLEAR PROBATION IF RECOVERED
    ============================
    */

	if (member.statusMeta?.isOnProbation && reputationScore >= -100 && member.statusMeta?.probationEndDate && member.statusMeta.probationEndDate < now) {
		await Member.updateOne(
			{ _id: memberId },
			{
				$set: {
					"statusMeta.isOnProbation": false
				}
			},
			{ session }
		);
	}

	/*
    ===============
    SUSPENSION RULE
    ===============
    */

	const currentLevel = member.statusMeta?.suspensionLevel || 0;

	let nextLevel = currentLevel;

	if (reputationScore <= -600 && currentLevel < 3) {
		nextLevel = 3;
	} else if (reputationScore <= -400 && currentLevel < 2) {
		nextLevel = 2;
	} else if (reputationScore <= -250 && currentLevel < 1) {
		nextLevel = 1;
	}

	if (nextLevel !== currentLevel) {
		const durationDays = SUSPENSION_DURATIONS[nextLevel];

		await Member.updateOne(
			{ _id: memberId },
			{
				$set: {
					"statusMeta.suspensionLevel": nextLevel,
					"statusMeta.suspensionEndDate": new Date(now.getTime() + durationDays * DAY_MS),
					"statusMeta.currentStatusStartDate": now
				}
			},
			{ session }
		);
	}
}

async function rebuildMemberState(memberId, session) {
	// full recompute fallback (rare use)
	// You don’t need to implement now — but you must plan for it
	throw new Error("Snapshot missing and rebuild not implemented yet. Coming Soon!");
}

export function calculateLevel(score) {
	if (score >= 500) return 6;
	if (score >= 300) return 5;
	if (score >= 100) return 4;
	if (score >= 0) return 3;
	if (score >= -200) return 2;
	return 1;
}
