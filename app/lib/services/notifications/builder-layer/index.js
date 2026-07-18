/*
=================================================================
RULE: ALL FILE NAMES IN THIS BUILDER-LAYER MUST START WITH "BUILD"
=================================================================
*/

import { NOTIFICATIONS } from "@/app/lib/events/events";
import { nanoid } from "nanoid";
import slugify from "slugify";

export const buildNotificationObject = async (data) => {
	try {
		if (!data) throw new Error("No data provided.");

		const notification = NOTIFICATIONS[data.event];

		const key = `${notification.title} ${nanoid()}`;

		const results = data?.list?.map((user) => ({
			...data,
			title: notification.title,
			event: notification.event,
			message: user?.message ?? notification.message,
			sender: user.sender,
			senderType: user.senderType,
			recipient: user.recipient,
			recipientType: user.recipientType,
			key: slugify(key)
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
