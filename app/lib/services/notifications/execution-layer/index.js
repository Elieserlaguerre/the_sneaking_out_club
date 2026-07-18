import Notification from "@/app/lib/models/Notification";
import { buildNotificationObject } from "../builder-layer";

export const createNotifications = async (data, session) => {
	const { create, event, list } = data;

	try {
		if (!create) throw new Error("create settings is required for notifications.");
		if (!event) throw new Error("event type is required for notifications.");
		if (!list) throw new Error("notification list is required to send notifications.");
		if (!session) throw new Error("session is reuired to send notifications.");

		const notifications = await buildNotificationObject(data);
		// console.log("notification", notifications);

		if (notifications.success === true) {
			console.log(notifications.message);

			const results = await Notification.insertMany(notifications.data, { session, ordered: true });

			return {
				succes: true,
				message: "All notifications have been sent.",
				status: 200,
				data: results
			};
		}
	} catch (error) {
		return {
			sucess: false,
			message: error?.message ?? "something went wrong with notificaion function.",
			error: error,
			status: 400
		};
	}
};
