/*
=================================================================
RULE: ALL FILE NAMES IN THIS BUILDER-LAYER MUST START WITH "BUILD"
=================================================================
*/

import { NOTIFICATIONS } from "@/app/lib/events/events";
import { nanoid } from "nanoid";

export const buildNotificationObject = async (data) => {
	try {
		if (!data) throw new Error("No data provided.");

		console.log("build notification", data);

		const notification = NOTIFICATIONS[data.event];

		const results = data?.list?.map((user) => ({
			...data,
			title: notification.title,
			event: notification.event,
			message: user?.message ?? notification.message,
			sender: user.sender,
			senderType: user.senderType,
			recipient: user.recipient,
			recipientType: user.recipientType
		}));

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
