/*
=================================================================
RULE: ALL FILE NAMES IN THIS BUILDER-LAYER MUST START WITH "BUILD"
=================================================================
*/

import { NOTIFICATIONS } from "@/app/lib/events/events";

export const buildNotificationObject = async (data) => {
	if (!data) throw new Error("No data provided.");

	console.log("build notification", data);

	const { notifications } = data;

	if (!notifications) throw new Error("Notification is missing.");

	const results = notifications?.list?.map((notification) => ({
		title: NOTIFICATIONS[data.notifications.event].title,
		event: NOTIFICATIONS[data.notifications.event].eventType,
		message: NOTIFICATIONS[data.notifications.event].message,
		from: notification.from,
		senderType: notification.senderType,
		to: notification.to,
		recipientType: notification.recipientType
	}));

	try {
		return {
			success: true,
			message: "Notification object successfully built.",
			data: results,
			status: 200
		};
	} catch (error) {
		return {
			success: false,
			message: error?.message ?? "something went wrong with the notification builder function.",
			error: error,
			status: 400
		};
	}
};
