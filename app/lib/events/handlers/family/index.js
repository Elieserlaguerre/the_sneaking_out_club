import { buildNewLedgerEntries } from "@/app/lib/services/events/builder-layer";
import { createNewLedger } from "@/app/lib/services/events/execution-layer";
import { createNotifications } from "@/app/lib/services/notifications/execution-layer";
import { eventSchema } from "@/app/lib/util/global/zod-validations";
import mongoose from "mongoose";
import { fromZodError } from "zod-validation-error";

/*
======================================================
RULE: ALL FUNCTIONS IN THIS FILE MUST END WITH "EVENT"
======================================================
*/

export const handleNewFamilyMemberEvent = async (data) => {
	const session = await mongoose.startSession();

	const validation = eventSchema.safeParse(data);

	try {
		if (validation.success) {
			const entries = await buildNewLedgerEntries(data);
			console.log("event triggered", entries);

			const ledgerResults = await createNewLedger(entries, session);

			if (ledgerResults.success === true) {
				console.log("Event Results:", ledgerResults.message);
				const { notifications } = data;

				if (notifications.notify === true) {
					const notificationResults = await createNotifications(data, session);
					if (notificationResults.succes === true) {
						console.log("Notifications Message:", notificationResults.message);
					} else {
						console.log("Notification error:", notificationResults.message);
						throw new Error(notificationResults.error);
					}
				}
			} else {
				console.log("Ledger Entry error", ledgerResults.message);
				throw new Error(ledgerResults?.error);
			}
		} else {
			const errors = fromZodError(validation.error);
			throw new Error(errors);
		}
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};

export const handleUpdateFamilyTreeEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		//business logic
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
	} finally {
		await session.endSession();
	}
};

export const handleFamilyMemberRemovalEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		// business logic
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};

export const handleUserProfileUpdateEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		//business logic
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};
