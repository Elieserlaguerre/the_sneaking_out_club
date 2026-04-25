import { deleteImage } from "@/app/lib/cloudinary/helpers/backend";
import db from "@/app/lib/database";
import Ancestor from "@/app/lib/models/Ancestor";
import FamilyTree from "@/app/lib/models/FamilyTree";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		// console.log("data", data);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		const filters = JSON.parse(data.filters);

		const familyTree = await FamilyTree.findOne({ creator: data.userId });

		const existingAncestors = familyTree.lineage;

		options = {
			creator: data.userId,
			_id: { $nin: existingAncestors }
		};

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Ancestor.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const ancestors = await Ancestor.find(options).skip(skip).limit(limit).sort(sort);

		const results = {
			totalPages,
			ancestors
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "Ancestors successfully retrieved." }, { status: 200 });
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
		// console.log("data", data);

		const { action, ancestorId, treeId } = data;

		if (!action) return NextResponse.json({ message: "membership action is required" }, { status: 400 });

		if (!ancestorId) return NextResponse.json({ message: "ancestorId is required for ancestor membership management." }, { status: 400 });

		if (!treeId) return NextResponse.json({ message: "family tree id is required." }, { status: 400 });

		const familyTree = await FamilyTree.findById({ _id: treeId });

		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const ancestor = await Ancestor.findById({ _id: ancestorId });

		if (!ancestor) return NextResponse.json({ message: "Ancestor could not be found." }, { status: 404 });

		switch (action) {
			case "add":
				if (familyTree.lineage.includes(ancestorId)) return NextResponse.json({ message: `${ancestor.firstName} has already been added to the lineage.` }, { status: 400 });

				familyTree.lineage.push(ancestor._id);
				await familyTree.save();

				break;
			case "remove":
				if (!familyTree.lineage.includes(ancestorId)) return NextResponse.json({ message: `${ancestor.firstName} is not currently in the lineage.` }, { status: 400 });

				familyTree.lineage.pull(ancestor._id);
				await familyTree.save();

				break;
			default:
				throw new Error("membership action is not recognized.");
		}

		return NextResponse.json({ message: `${ancestor.firstName} ${ancestor.lastName} has successfully been ${action === "add" ? "added to" : "removed from"} the ancestors' lineage.` }, { status: 200 });
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

		const { ancestorId, treeId } = data;

		const ancestor = await Ancestor.findById({ _id: ancestorId });
		const familyTree = await FamilyTree.findById({ _id: treeId });

		if (ancestor?.image?.publicId) {
			const imageDeleted = await deleteImage(ancestor?.image?.publicId);
			console.log("imageDeleted", imageDeleted);
		}

		familyTree.lineage.pull(ancestor._id);
		await familyTree.save();

		await ancestor.deleteOne();

		return NextResponse.json({ message: "POST route successfully accessed." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
