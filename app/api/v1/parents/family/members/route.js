import "@/app/lib/events/register-handlers";
import { encryptPassword } from "@/app/lib/auth/helpers";
import { deleteImage, deleteSubfolder } from "@/app/lib/cloudinary/helpers/backend";
import db from "@/app/lib/database";
import { eventBus } from "@/app/lib/events/eventBus";
import { EVENTS } from "@/app/lib/events/events";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import { NextResponse } from "next/server";
import slugify from "slugify";
import FamilyTree from "@/app/lib/models/FamilyTree";
import Teacher from "@/app/lib/models/Teacher";
import Admin from "@/app/lib/models/Admin";
import Family from "@/app/lib/models/Family";
import FamilyMember from "@/app/lib/models/FamilyMember";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { user } = data;

		/*
		===========
		VALIDATIONS
		===========
		*/

		if (!user) return NextResponse.json({ message: "User data is missing." }, { status: 400 });

		if (!user.creator) return NextResponse.json({ message: "parent Id is required." }, { status: 400 });

		const parent = await Parent.findById({ _id: user.creator });

		if (!parent) return NextResponse.json({ message: "current user could not be found." }, { status: 404 });

		const familyTree = await FamilyTree.findById({ _id: parent.familyTree });

		if (!familyTree) return NextResponse.json({ message: "cannot add family members without a family tree." }, { status: 400 });

		/*
		===============
		CREATE NEW USER
		===============
		*/
		let createdUser, family;

		switch (user.memberType) {
			case "ancestor":
				const ancestor = await FamilyMember.create({
					...user,
					creator: parent._id,
					creatorType: parent.docType,
					type: user.memberType,
					relation: [
						{
							member: parent._id,
							memberType: parent.docType,
							role: user.relation
						}
					]
				});

				if (familyTree.creator.toString() === user.creator) {
					familyTree.lineage.push(ancestor._id);
					await familyTree.save();
				}

				break;
			case "root family member":
				const rootMember = await FamilyMember.create({
					...user,
					type: user.memberType,
					familyTree: familyTree._id,
					creator: parent._id,
					creatorType: parent.docType,
					relation: [
						{
							member: parent._id,
							memberType: parent.docType,
							role: user.relation
						}
					]
				});

				if (familyTree.creator.toString() === user.creator) {
					familyTree.rootFamily.push({ member: rootMember?._id, memberType: rootMember.docType });
					await familyTree.save();
				}
				break;
			case "household member":
				family = await Family.findById({ _id: user.family });
				if (!family) return NextResponse.json({ message: "you cannot add a family member without a household" }, { status: 404 });

				const householdMember = await FamilyMember.create({
					...user,
					type: user.memberType,
					familyTree: familyTree._id,
					family: family._id,
					creator: parent._id,
					creatorType: parent.docType,
					relation: [
						{
							member: parent._id,
							memberType: parent.docType,
							role: user.relation
						}
					]
				});

				if (family.creator.toString() === user.creator) {
					family.members.push({ member: householdMember?._id, memberType: householdMember.docType });
					await family.save();
				}

				break;
			case "platform user":
				family = await Family.findById({ _id: parent.family });
				if (!family) return NextResponse.json({ message: "you cannot add a family member without a household" }, { status: 404 });

				const newUser = {
					...user,
					familyTree: familyTree._id,
					family: family._id,
					creator: parent._id,
					creatorType: parent.docType,
					cloudinarySubfolder: `the_sneaking_out_club/${slugify(`${user.firstName} ${user.lastName}`)}/members`,
					relation: [
						{
							member: parent._id,
							memberType: parent.docType,
							role: user.relation
						}
					]
				};

				newUser.password = await encryptPassword(user.password);
				createdUser = await Member.create(newUser);

				if (family.creator.toString() === createdUser.creator) {
					family.members.push({ member: createdUser?._id, memberType: createdUser.docType });
					await family.save();
				}

				break;
			default:
				throw new Error("family member type not recognized.");
		}

		/*
		==============
		TRIGGER EVENTS
		==============
		*/

		// const event = {
		// 	eventType: EVENTS[data.event].event,
		// 	ledgerEntry: {
		// 		create: true,
		// 		type: "single",
		// 		updateSnapshot: false
		// 	},
		// 	notifications: {
		// 		notify: parent.family.length > 0,
		// 		event: EVENTS[data.event].notification,
		// 		list: parent.family.map((individual) => ({
		// 			_id: individual._id.toString(),
		// 			from: parent._id.toString(),
		// 			senderType: parent.userType,
		// 			to: individual.member.toString(),
		// 			recipientType: individual.userType
		// 		}))
		// 	},
		// 	metaData: {
		// 		source: parent._id.toString(),
		// 		sourceType: "Parent",
		// 		ledgerName: "family",
		// 		user: createdUser._id.toString(),
		// 		userType: "Member"
		// 	}
		// };

		// eventBus.emit(EVENTS[data.event].event, event);

		return NextResponse.json({ results: createdUser, message: "New user was successfully created: " }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		console.log("data", data);

		const { userId } = data;

		const filter = JSON.parse(data.filter);

		const parent = await Parent.findById({ _id: userId });

		let page, limit, skip, options, sort, results, totalDocuments, totalPages, ancestors;

		options = {};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;

		switch (filter.memberType) {
			case "all members":
				options = {
					$or: [{ familyTree: parent.familyTree }, { creator: parent._id }]
				};

				const [familyMembers, members, parents, teachers, admins] = await Promise.all([FamilyMember.find(options), Member.find(options), Parent.find(options), Teacher.find(options), Admin.find(options)]);

				const memberSearch = [].concat(familyMembers, members, parents, teachers, admins);
				// console.log("membersearch", memberSearch);

				memberSearch.sort((a, b) => {
					return filter?.sort === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
				});

				totalDocuments = memberSearch.length;
				totalPages = Math.ceil(totalDocuments / limit);

				const paginated = memberSearch.slice(skip, skip + limit);

				results = {
					totalPages,
					data: paginated
				};

				console.log("results", results);

				break;
			case "ancestor":
				options = {
					type: filter.memberType,
					$or: [{ familyTree: parent.familyTree }, { creator: parent._id }]
				};

				totalDocuments = await FamilyMember.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				ancestors = await FamilyMember.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					data: ancestors
				};
				break;
			case "root family member":
				break;
			case "household member":
				break;
			case "platform user":
				break;
			case "family search":
				break;
			default:
				break;
		}

		return NextResponse.json({ results, message: "Family members sucessfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { update, memberId } = data;

		if (!memberId) return NextResponse.json({ message: "member ID is required." }, { status: 400 });
		if (!update) return NextResponse.json({ message: "update is required." }, { status: 400 });

		return NextResponse.json({ message: "Family member was successfully updated." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		await db.connect();
		let data, user, subfolderDeleted;
		data = await req.json();
		// console.log("data", data);

		const { userId, docType } = data;

		if (!userId) return NextResponse.json({ message: "userId is missing" }, { status: 404 });
		if (!docType) return NextResponse.json({ message: "docType is missing" }, { status: 404 });

		switch (docType) {
			case "Member":
				user = await Member.findById({ _id: userId });

				if (!user) {
					return NextResponse.json({ message: "User not found" }, { status: 404 });
				}

				subfolderDeleted = await deleteSubfolder(user.cloudinarySubfolder);

				if (subfolderDeleted.success) await user.deleteOne();
				break;

			case "Family_Membership":
				user = await FamilyMembership.findById({ _id: userId });

				if (!user) {
					return NextResponse.json({ message: "User not found" }, { status: 404 });
				}

				subfolderDeleted = await deleteImage(user?.image?.publicId);

				if (subfolderDeleted.success) await user.deleteOne();

				break;
			default:
				break;
		}

		/*
		==============
		TRIGGER EVENTS
		==============
		*/

		return NextResponse.json({ message: "User has been deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
