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
import Ancestor from "@/app/lib/models/Ancestor";
import FamilyTree from "@/app/lib/models/FamilyTree";
import FamilyMembership from "@/app/lib/models/FamilyMembership";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { user, department, parentId } = data;

		/*
		===========
		VALIDATIONS
		===========
		*/

		if (!user) return NextResponse.json({ message: "User data is missing." }, { status: 400 });

		if (!department) return NextResponse.json({ message: "department is required." }, { status: 400 });

		if (!parentId) return NextResponse.json({ message: "parent Id is required." }, { status: 400 });

		const parent = await Parent.findById({ _id: parentId });

		if (!parent) return NextResponse.json({ message: "current user could not be found." }, { status: 404 });

		const familyTree = await FamilyTree.findById({ _id: parent.familyTree });

		if (!familyTree) return NextResponse.json({ message: "cannot add family members without a family tree." }, { status: 400 });

		/*
		===============
		CREATE NEW USER
		===============
		*/
		let createdUser;

		switch (user.memberType) {
			case "ancestor":
				const ancestor = await Ancestor.create({
					...user,
					creator: parent._id,
					relation: [
						{
							member: parent._id,
							memberType: parent.docType,
							role: user.relation
						}
					]
				});

				if (familyTree.creator.toString() === parentId) {
					familyTree.lineage.push(ancestor._id);
					await familyTree.save();
				}

				break;
			case "root family member":
				const familyMember = await FamilyMembership.create({
					...user,
					familyTree: familyTree._id,
					creator: parent._id,
					relation: [
						{
							member: parent._id,
							memberType: parent.docType,
							role: user.relation
						}
					]
				});

				if (familyTree.creator.toString() === parentId) {
					familyTree.rootFamily.push({ member: familyMember?._id, memberType: familyMember.docType });
					await familyTree.save();
				}
				break;
			case "household member":
				break;
			case "platform user":
				const newUser = {
					...user,
					cloudinarySubfolder: `the_sneaking_out_club/${slugify(`${user.firstName} ${user.lastName}`)}/${department}`
				};

				newUser.password = await encryptPassword(user.password);

				createdUser = await Member.create(newUser);
				break;
			default:
				throw new Error("family member type not recognized.");
		}

		/*
		==============
		TRIGGER EVENTS
		==============
		*/

		// new event
		// const newEvent = {
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

		// console.log("newEvent", newEvent);

		// eventBus.emit(EVENTS[data.event].event, newEvent);

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
		// console.log("data", data);

		const { userId } = data;

		const filter = JSON.parse(data.filter);

		const parent = await Parent.findById({ _id: userId }).select({ family: 1 });

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			_id: parent.family,
			status: filter.status
		};

		if (filter.sort === "newest") sort = { createAt: -1 };
		if (filter.sort === "oldest") sort = { age: 1 };
		if (filter.sort === "youngest") sort = { age: -1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Member.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);

		const familyMembers = await Member.find(options).skip(skip).limit(limit).sort(sort);
		// console.log("family members", familyMembers);

		const results = {
			totalPages,
			familyMembers
		};

		console.log("results test", results);

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
