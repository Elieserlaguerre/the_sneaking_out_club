import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Member from "@/app/lib/models/Member";
import Notification from "@/app/lib/models/Notification";
import Parent from "@/app/lib/models/Parent";
import Teacher from "@/app/lib/models/Teacher";
import { MODEL_MAP } from "@/app/lib/util/backend/variables";
import { NextResponse } from "next/server";
import "@/app/lib/events/register-handlers";
import { EVENTS } from "@/app/lib/events/events";
import { eventBus } from "@/app/lib/events/eventBus";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		// console.log("data", data);

		const { userId } = data;

		const filters = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			recipient: userId
		};

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Notification.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);

		const notifications = await Notification.find(options)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.populate([
				{
					path: "sender",
					select: {
						firstName: 1,
						lastName: 1,
						image: 1,
						docType: 1
					}
				}
			]);

		const results = {
			totalNotifications: totalDocuments,
			totalPages,
			notifications
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "User notifications successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data, sender, recipient, event;
		data = await req.json();
		// console.log("data", data);

		const { response, notificationId } = data;

		if (!response) return NextResponse.json({ message: "response is required for notification update." }, { status: 400 });
		if (!notificationId) return NextResponse.json({ message: "notificationId is required for notification response." }, { status: 400 });

		const notification = await Notification.findById({ _id: data.notificationId });

		const groupId = notification?.metaData?.groupId;

		switch (response) {
			case "accept":
				sender = await MODEL_MAP[data.senderType].findById({ _id: data.sender });
				// console.log("sender", sender);

				if (!sender) return NextResponse.json({ message: "sender not found." }, { status: 404 });

				recipient = await MODEL_MAP[data.recipientType].findById({ _id: data.recipient });
				// console.log("recipient", recipient);

				if (!recipient) return NextResponse.json({ message: "recipient not found." }, { status: 404 });

				if (sender && recipient) {
					if (sender.connections.some((connection) => connection.member.toString() === recipient._id.toString())) return NextResponse.json({ message: `${recipient?.firstName} is already in your connections list.` }, { status: 400 });
					sender.connections.push({
						member: recipient._id,
						memberType: recipient.docType,
						favored: false
					});

					await sender.save();

					if (recipient.connections.some((connection) => connection.member.toString() === sender._id.toString())) return NextResponse.json({ message: `${sender?.firstName} is already in your connections list.` }, { status: 400 });
					recipient.connections.push({
						member: sender._id,
						memberType: sender.docType,
						favored: false
					});

					await recipient.save();
				}

				event = {
					ledgerEntry: {
						event: EVENTS[data.event].event,
						create: false,
						type: "single",
						updateSnapshot: false,
						metaData: {
							//add any metadata
						}
					},
					notifications: {
						create: true,
						event: EVENTS[data.event].notification,
						list: [
							{
								sender: data.sender,
								senderType: data.senderType,
								recipient: data.recipient,
								recipientType: data.recipientType,
								message: `The friend request you sent to ${sender.firstName} has been accepted and ${sender.gender === "Male" ? "he" : "she"} has been added to your connections list.`
							},
							{
								sender: data.recipient,
								senderType: data.recipientType,
								recipient: data.sender,
								recipientType: data.senderType,
								message: `You've accepted a friend request from ${recipient.firstName}, and ${recipient.gender === "Male" ? "he" : "she"} has been added to your connections list.`
							}
						],
						metaData: {
							groupId: `${EVENTS[data.event].notification}_${nanoid()}`
						},
						creator: sender._id.toString(),
						creatorType: sender.docType
					}
				};

				eventBus.emit(EVENTS[data.event].event, event);

				if (groupId) await Notification.deleteMany({ "metaData.groupId": groupId });
				else await Notification.findByIdAndDelete({ _id: notificationId });

				break;
			case "decline":
				event = {
					ledgerEntry: {
						event: EVENTS[data.event].event,
						create: false,
						type: "single",
						updateSnapshot: false,
						metaData: {
							//add any metadata
						}
					},
					notifications: {
						create: true,
						event: EVENTS[data.event].notification,
						list: [
							{
								sender: data.sender,
								senderType: data.senderType,
								recipient: data.recipient,
								recipientType: data.recipientType
							}
						],
						metaData: {
							groupId: `${EVENTS[data.event].notification}_${nanoid()}`
						},
						creator: sender._id.toString(),
						creatorType: sender.docType
					}
				};

				eventBus.emit(EVENTS[data.event].event, event);

				if (groupId) await Notification.deleteMany({ "metaData.groupId": groupId });
				else await Notification.findByIdAndDelete({ _id: notificationId });
				break;
			default:
				throw new Error("Response type not authorized.");
		}

		return NextResponse.json({ message: "notification response successfully sent." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { notificationId, action } = data;

		if (!notificationId) return NextResponse.json({ message: "notificationId is missing and required." }, { status: 404 });
		if (!action) return NextResponse.json({ message: "delete action is missing and required." }, { status: 404 });

		switch (action) {
			case "delete":
				await Notification.findByIdAndDelete({ _id: notificationId });
				break;
			case "cancel request":
				const notification = await Notification.findById({ _id: notificationId });

				const groupId = notification?.metaData?.groupId;

				if (!groupId) await notification.deleteOne();
				else await Notification.deleteMany({ "metaData.groupId": groupId });

				break;
			default:
				throw new Error("Action not authorized");
		}

		return NextResponse.json({ message: "Notification was sucessfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
