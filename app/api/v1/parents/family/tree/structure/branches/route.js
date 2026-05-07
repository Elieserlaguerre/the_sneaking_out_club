import { deleteImage } from "@/app/lib/cloudinary/helpers/backend";
import db from "@/app/lib/database";
import Family from "@/app/lib/models/Family";
import FamilyTree from "@/app/lib/models/FamilyTree";
import Parent from "@/app/lib/models/Parent";
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

		const { treeId } = data;

		if (!treeId) throw new Error("treeId is required.");

		const familyTree = await FamilyTree.findById({ _id: treeId });
		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const parent = await Parent.findById({ _id: familyTree.creator });

		const filter = JSON.parse(data?.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			_id: { $nin: familyTree.branches },
			$or: [{ familyTree: treeId }, { creator: parent?._id }]
		};

		if (filter.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Family.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);

		const branches = await Family.find(options).skip(skip).limit(limit).sort(sort);
		const results = {
			totalPages,
			branches
		};

		return NextResponse.json({ results, message: "Family branches successfully retrieved." }, { status: 200 });
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

		const { action, treeId, branchId } = data;

		if (!action) throw new Error("branch management action is required.");
		if (!treeId) throw new Error("treeId is required.");
		if (!branchId) throw new Error("branchId is required.");

		const familyTree = await FamilyTree.findById({ _id: treeId });
		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const family = await Family.findById({ _id: branchId });
		if (!family) return NextResponse.json({ message: "family not found" }, { status: 404 });

		switch (action) {
			case "add":
				if (familyTree.branches.includes(family._id)) throw new Error("This household is already a part of the family tree's branches.");
				familyTree.branches.push(family._id);
				await familyTree.save();
				break;
			case "remove":
				if (!familyTree.branches.includes(family._id)) throw new Error("This household is not a part of the family tree's branches.");
				familyTree.branches.pull(family._id);
				await familyTree.save();
				break;
			default:
				throw new Error("family management action is not authorized.");
		}

		return NextResponse.json({ message: `${family.name} has successfully been ${action === "add" ? "added to" : "removed from"} the family tree.` }, { status: 200 });
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

		const { familyId } = data;

		if (!familyId) throw new Error("familyId is required.");

		const family = await Family.findById({ _id: familyId });

		const treeId = family.familyTree;
		if (!treeId) throw new Error("treeId is required.");

		const familyTree = await FamilyTree.findById({ _id: treeId });

		familyTree.branches.pull(family._id);
		await familyTree.save();

		const deletedImage = await deleteImage(family?.crest?.publicId);
		console.log("deletedImage", deletedImage);

		await family.deleteOne();

		return NextResponse.json({ message: "family branch successfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
