import db from "@/app/lib/database";
import { eventBus } from "@/app/lib/events/eventBus";
import { EVENTS } from "@/app/lib/events/events";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Teacher from "@/app/lib/models/Teacher";
import Admin from "@/app/lib/models/Admin";
import { arrayPagination, fetchConnections } from "@/app/lib/util/backend/helpers";
import { mapConnectionsByType } from "@/app/lib/util/global";
import { NextResponse } from "next/server";
import "@/app/lib/events/register-handlers";
import { MODEL_MAP } from "@/app/lib/util/backend/variables";
import { nanoid } from "nanoid";
import SearchQuery from "@/app/lib/models/SearchQuery";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;

		data = Object.fromEntries(query.entries());
		console.log("data", data);

		const { userId } = data;

		if (!userId) return NextResponse.json({ message: "userId is required." }, { status: 400 });

		const currentUser = await Parent.findById({ _id: userId }).populate([
			{
				path: "connections",
				populate: {
					path: "member"
				}
			}
		]);

		if (!currentUser) return NextResponse.json({ message: "user not found." }, { status: 404 });

		const currentConnections = currentUser.connections.map((connection) => connection.member);

		const filters = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort, connections, results, filteredConnections, paginatedResults;

		options = {
			_id: {
				$ne: currentUser._id
			}
		};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;

		switch (filters.options) {
			case "my connections":
				filteredConnections = currentUser.connections.filter((connection) => connection.favored === false);
				paginatedResults = arrayPagination(filteredConnections, page, limit, sort);

				results = {
					totalPages: paginatedResults.totalPages,
					connections: paginatedResults.data,
					total: paginatedResults.total
				};

				// console.log("my connections", results);

				break;
			case "favorite connections":
				filteredConnections = currentUser.connections.filter((connection) => connection.favored === true);

				paginatedResults = arrayPagination(filteredConnections, page, limit, sort);

				results = {
					totalPages: paginatedResults.totalPages,
					connections: paginatedResults.data,
					total: paginatedResults.total
				};
				break;
			case "user search":
				options = {
					_id: {
						$ne: currentUser._id,
						$nin: currentConnections
					}
				};

				totalDocuments = await Member.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				connections = await Member.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					connections
				};
				break;
			case "parent search":
				options = {
					_id: {
						$ne: currentUser._id,
						$nin: currentConnections
					}
				};

				totalDocuments = await Parent.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				connections = await Parent.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					connections
				};
				break;
			case "teacher search":
				options = {
					_id: {
						$ne: currentUser._id,
						$nin: currentConnections
					}
				};

				totalDocuments = await Teacher.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				connections = await Teacher.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					connections
				};
				break;

			case "search":
				const searchTerms = data.query.split(" ").filter(Boolean);

				options = {
					$or: searchTerms.flatMap((term) => [
						{
							firstName: { $regex: term, $options: "i" }
						},
						{
							lastName: { $regex: term, $options: "i" }
						}
					])
				};

				totalDocuments = await MODEL_MAP[data.platformSection].countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);

				connections = await MODEL_MAP[data.platformSection].find(options).skip(skip).limit(limit).sort(sort);

				results = {
					totalPages,
					connections
				};

				const queryExists = await SearchQuery.findOne({ query: data.query, section: data.section, user: data.userId, userType: data.userType });

				if (!queryExists) {
					results.createSearchHistory = true;
					results.searchData = {
						query: data.query,
						section: data.section,
						user: data.userId,
						userType: data.userType
					};
				}

				break;
			default:
				throw new Error("filter option not authorized.");
		}

		console.log("results", results);

		return NextResponse.json({ results, message: "connections retrieved." }, { status: 200 });
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

		const { sender, senderType, recipient, recipientType } = data;

		if (!sender) return NextResponse.json({ message: "sender is required." }, { status: 400 });
		if (!senderType) return NextResponse.json({ message: "sender type is required." }, { status: 400 });
		if (!recipient) return NextResponse.json({ message: "recipient is required." }, { status: 400 });
		if (!recipientType) return NextResponse.json({ message: "recipientType is required." }, { status: 400 });

		const currentSender = await MODEL_MAP[senderType].findById({ _id: sender });
		const currentRecipient = await MODEL_MAP[recipientType].findById({ _id: recipient });

		/*
        ================================
        SEND FRIEND REQUEST NOTIFICATION
        ================================
        */

		const event = {
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
						sender,
						senderType,
						recipient,
						recipientType,
						message: `you have a new friend request from ${currentSender?.firstName}.`
					},
					{
						sender: recipient,
						senderType: recipientType,
						recipient: sender,
						recipientType: senderType,
						message: `Your friend request has been sent to ${currentRecipient?.firstName}. Now you're awaiting ${currentRecipient.gender === "Female" ? "her" : "his"} response!`
					}
				],
				metaData: {
					groupId: `${EVENTS[data.event].notification}_${nanoid()}`
				},
				creator: sender,
				creatorType: senderType
			}
		};

		eventBus.emit(EVENTS[data.event].event, event);

		return NextResponse.json({ message: "Your friend request was successfully sent." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { userId, action, connectionId } = data;

		if (!userId) return NextResponse.json({ message: "user ID is required." }, { status: 400 });
		if (!action) return NextResponse.json({ message: "action is required." }, { status: 400 });
		if (!connectionId) return NextResponse.json({ message: "connection ID is required." }, { status: 400 });

		const currentUser = await Parent.findById({ _id: userId });

		const connection = currentUser.connections.find((conn) => conn.member.toString() === connectionId);

		if (!connection) {
			return NextResponse.json({ message: "Connection not found." }, { status: 404 });
		}

		connection.favored = action === "add favorite";
		await currentUser.save();

		// console.log("currentUser", currentUser);

		return NextResponse.json({ message: "notification response sent." }, { status: 200 });
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
		console.log("data", data);

		const { userId, connectionId } = data;

		if (!userId) return NextResponse.json({ message: "userId is required." }, { status: 400 });
		if (!connectionId) return NextResponse.json({ message: "connection ID is required." }, { status: 400 });

		const currentUser = await Parent.findById({ _id: userId });

		if (!currentUser) results;

		const friend = currentUser.connections.find((connection) => connection.member.toString() === connectionId);
		// console.log("friend", friend);

		if (!friend) return NextResponse.json({ message: "friend connection not found." }, { status: 404 });
		/*
            =============================================
            remove the friend from the current user and from the friend's connections list.
            =============================================
            */

		currentUser.connections.pull(friend);
		await currentUser.save();

		const removedIndividual = await MODEL_MAP[friend.memberType].findById({ _id: friend.member });
		// console.log("removedIndividual", removedIndividual);

		const target = removedIndividual.connections.find((conn) => conn.member.toString() === currentUser._id.toString());

		if (!target) return NextResponse.json({ message: "user was already removed." }, { status: 404 });

		removedIndividual.connections.pull(target);
		await removedIndividual.save();

		console.log("currentUser", currentUser);

		return NextResponse.json({ message: "connection deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
