import { fromZodError } from "zod-validation-error";
import { eventSchema } from "../../util/global/zod-validations";
import { createNotifications } from "../../services/notifications/execution-layer";
import { buildNewLedgerEntries } from "../../services/events/builder-layer";
import { createNewLedger } from "../../services/events/execution-layer";

export const processEvent = async (event, session) => {
	try {
		const eventValidation = eventSchema.safeParse(event);
		if (!eventSchema) throw new Error("event schema is required.");
		if (!session) throw new Error("session is required.");

		if (eventValidation.success) {
			if (event?.ledgerEntry?.create === true) {
				// console.log("ledger event", event.ledger);
				const entries = await buildNewLedgerEntries(event.ledger);

				const ledgerResults = await createNewLedger(entries, session);
				if (ledgerResults.success === true && event.notifications.create === true) {
					const notificationResults = await createNotifications(data, session);
					if (notificationResults.succes === true) console.log("Notifications Message:", notificationResults.message);
					else throw new Error(notificationResults.error);
				} else {
					console.log("Ledger Entry error", ledgerResults.message);
					throw new Error(ledgerResults?.error);
				}
			}

			if (event?.notifications?.create === true && event?.ledgerEntry?.create === false) {
				const notificationResults = await createNotifications(event.notifications, session);
				// console.log("notification event", notificationResults);
				if (notificationResults.succes === true) console.log("Notifications Message:", notificationResults.message);
				else throw new Error(notificationResults.error);
			}
		} else {
			const errors = fromZodError(eventValidation.error);
			throw new Error(errors);
		}
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};
