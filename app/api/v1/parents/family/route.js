import "@/app/lib/events/register-handlers";
import { encryptPassword } from "@/app/lib/auth/helpers";
import { deleteSubfolder } from "@/app/lib/cloudinary/helpers/server";
import db from "@/app/lib/database";
import { eventBus } from "@/app/lib/events/eventBus";
import { EVENTS } from "@/app/lib/events/events";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import { familyRelations } from "@/app/lib/util/frontend-helper-functions";
import { NextResponse } from "next/server";
import slugify from "slugify";

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

		const userAlreadyExist = await Member.findOne({ email: user.email });

		if (userAlreadyExist) return NextResponse.json({ message: "user already exist." }, { status: 400 });

		/*
		===============
		CREATE NEW USER
		===============
		*/

		const newUser = {
			...user,
			cloudinarySubfolder: `the_sneaking_out_club/${slugify(`${user.firstName} ${user.lastName}`)}/${department}`
		};

		let createdUser;

		newUser.password = await encryptPassword(user.password);

		createdUser = await Member.create(newUser);

		/*
		====================
		UPDATE FAMILY FIELDS
		====================
		*/

		const parent = await Parent.findById({ _id: parentId });

		createdUser.family.push({
			member: parent._id,
			memberType: "Parent",
			role: familyRelations(user.relation, parent.gender)
		});

		await createdUser.save();

		parent.family.push({
			member: createdUser._id,
			memberType: "Member",
			role: user.relation
		});

		await parent.save();

		/*
		==============
		TRIGGER EVENTS
		==============
		*/

		// new event
		const newEvent = {
			eventType: EVENTS[data.event].event,
			source: parent._id.toString(),
			sourceType: "Parent",
			metaData: {
				ledgerName: "family",
				user: createdUser._id,
				userType: "Member"
			},
			LedgerEntry: {
				create: true,
				type: "single"
			},
			updateSnapshot: false,
			notifications: {
				notify: true,
				event: EVENTS[data.event].notification
			}
		};

		// console.log("newEvent", newEvent);

		eventBus.emit(EVENTS[data.event].event, newEvent);

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
		const family = parent.family.map((family) => family.member);
		// console.log("family", family);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			_id: { $in: family },
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

		// console.log("results", results);

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
		let data;
		data = await req.json();
		// console.log("data", data);

		const { userId } = data;

		if (!userId) return NextResponse.json({ message: "userId is missing" }, { status: 404 });

		const user = await Member.findById({ _id: userId });

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const subfolderDeleted = await deleteSubfolder(user.cloudinarySubfolder);

		console.log("subfolderDeleted", subfolderDeleted);

		if (subfolderDeleted.success) await user.deleteOne();

		return NextResponse.json({ message: "User has been deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
