import db from "@/app/lib/database";
import { eventBus } from "@/app/lib/events/eventBus";
import { EVENTS, NOTIFICATIONS } from "@/app/lib/events/events";
import Group from "@/app/lib/models/Group";
import JoinRequest from "@/app/lib/models/JoinRequest";
import { CONTENT_MAP, MODEL_MAP } from "@/app/lib/util/backend/variables";
import { NextResponse } from "next/server";
import "@/app/lib/events/register-handlers";
import slugify from "slugify";
import { nanoid } from "nanoid";
import Notification from "@/app/lib/models/Notification";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		// console.log("data", data);

		const filters = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort, results;

		const myGroups = await Group.find({
			$or: [
				{
					owner: data.userId
				},
				{
					"members.member": data.userId
				}
			]
		}).lean();

		const excludedGroups = myGroups.map((group) => group._id.toString());
		// console.log("excludedGroups", excludedGroups);

		options = {
			//params
		};

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		if (filters.query?.trim()) {
			options.name = {
				$regex: filters.query.trim(),
				$options: "i" // case-insensitive
			};
		}

		if (filters.category) {
			options.category = filters.category;
		}

		if (excludedGroups.length > 0) {
			options._id = {
				$nin: excludedGroups
			};
		}

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;

		switch (filters.target) {
			case "groups":
				if (filters.category) options.category = filters.category;
				totalDocuments = await Group.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				const groups = await Group.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					data: groups,
					type: filters.target
				};

				// console.log("results", results);

				return NextResponse.json({ results, message: "route successfully accessed." }, { status: 200 });
			case "categories":
				totalDocuments = await Group.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				const categories = await Group.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					data: categories,
					type: filters.target
				};

				return NextResponse.json({ results, message: "route successfully accessed." }, { status: 200 });
			case "events":
				totalDocuments = await Group.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				const events = await Group.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					data: events,
					type: filters.target
				};

				return NextResponse.json({ results, message: "route successfully accessed." }, { status: 200 });
			default:
				return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { userId, userType, groupId, docType } = data;

		const user = await MODEL_MAP[userType].findById(userId).lean();

		const group = await CONTENT_MAP[docType].findById(groupId).lean();

		if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

		if (!group) return NextResponse.json({ message: "group not found." }, { status: 404 });

		const request = await JoinRequest.create({
			requester: user._id,
			requesterType: user.docType,
			entity: group._id,
			entityType: group.docType,
			owner: group.owner,
			ownerType: group.ownerType
		});

		const event = {
			ledgerEntry: {
				event: EVENTS[data?.event].event,
				create: false,
				type: "single",
				updateSnapshot: false,
				metaData: {
					//add any metadata
				}
			},
			notifications: {
				create: true,
				event: EVENTS[data?.event].notification,
				list: [
					{
						sender: user._id.toString(),
						senderType: user.docType,
						recipient: group.owner.toString(),
						recipientType: group.ownerType,
						message: `${user.firstName} has sent you a reqest to join your group: ${group.name}.`
					},
					{
						sender: group.owner.toString(),
						senderType: group.ownerType,
						recipient: user._id.toString(),
						recipientType: user.docType,
						message: `The join reqest you sent to group: ${group.name} is pending a response from the group's admin.`
					}
				],
				metaData: {
					joinRequestId: request._id
				},
				creator: user._id.toString(),
				creatorType: user.docType
			}
		};

		eventBus.emit(EVENTS[data.event].event, event);

		return NextResponse.json({ message: "Join Request successfully sent." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data, event;
		data = await req.json();
		console.log("data", data);

		const { responseType, requestId, key, userId, userType } = data;

		const request = await JoinRequest.findById(requestId);

		const group = await Group.findById(request.entity);

		const user = await MODEL_MAP[userType].findById(userId);

		if (!request) return NextResponse.json({ message: "Join Request not found." }, { status: 404 });

		if (!group) return NextResponse.json({ message: "group not found." }, { status: 404 });

		if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

		console.log("group", group);

		switch (responseType) {
			case "accept":
				//find the requester.
				const newClubMember = await MODEL_MAP[request.requesterType].findById(request.requester);
				console.log("club member", newClubMember);

				if (!newClubMember) return NextResponse.json({ message: "User not found." }, { status: 404 });

				//add the requester to the group they're requesting to join.
				group.members.push({
					member: newClubMember._id,
					memberType: newClubMember.docType
				});

				await group.save();

				//notify the requester and owner of the group being joined.
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
								sender: request.owner,
								senderType: request.ownerType,
								recipient: request.requester,
								recipientType: request.requesterType,
								message: `Congratulations! your request to join group: ${group.name} has been accepted. You are now a member!`
							},
							{
								sender: request.requester,
								senderType: request.requesterType,
								recipient: request.owner,
								recipientType: request.ownerType,
								message: `${newClubMember.firstName} ${newClubMember.lastName} has been added to your group: ${group.name}.`
							}
						],
						metaData: {
							//add any metadata
						},
						creator: user._id,
						creatorType: user.docType
					}
				};

				eventBus.emit(EVENTS[data.event].event, event);

				//delete join request
				await JoinRequest.findByIdAndDelete(requestId);

				//delete request notification
				await Notification.deleteMany({ key });

				return NextResponse.json({ message: "response message" }, { status: 200 });
			case "decline":
				//delete join request
				await JoinRequest.findByIdAndDelete(requestId);

				//delete request notification
				await Notification.deleteMany({ key });

				//notify the requester of the decline
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
								sender: user._id,
								senderType: user.docType,
								recipient: request.requester,
								recipientType: request.requesterType,
								message: `Your request to join group: ${group.name} was denied.`
							}
						],
						metaData: {
							//add any metadata
						},
						creator: user._id,
						creatorType: user.docType
					}
				};

				eventBus.emit(EVENTS[data.event].event, event);

				return NextResponse.json({ message: "response message" }, { status: 200 });
			default:
				return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
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

		const { key, requestId } = data;

		await JoinRequest.findByIdAndDelete(requestId);

		await Notification.deleteMany({ key });

		return NextResponse.json({ message: "Your join request was successfully cancelled." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
