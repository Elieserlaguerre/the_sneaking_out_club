import { deleteImage } from "@/app/lib/cloudinary/helpers/backend";
import db from "@/app/lib/database";
import Family from "@/app/lib/models/Family";
import FamilyMember from "@/app/lib/models/FamilyMember";
import FamilyTree from "@/app/lib/models/FamilyTree";
import Parent from "@/app/lib/models/Parent";
import SearchQuery from "@/app/lib/models/SearchQuery";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();

		const userId = data?.creator;
		if (!userId) throw new Error("user ID is required.");

		const familyTree = await FamilyTree.create({
			...data,
			slug: slugify(data.name)
		});

		const parent = await Parent.findById({ _id: userId });
		parent.familyTree = familyTree._id;
		await parent.save();

		return NextResponse.json({ results: familyTree, message: "New family tree was successfully created." }, { status: 200 });
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

		data = Object.fromEntries(query.entries());
		// console.log("data", data);

		const filter = JSON.parse(data.filter);

		let page, limit, skip, totalDocuments, totalPages, options, sort, familyTrees, results;

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 25;
		skip = (page - 1) * limit;

		switch (filter.actions) {
			case "my family tree":
				const userId = data.userId;

				const parent = await Parent.findById({ _id: userId });

				const familyTree = await FamilyTree.findById({ _id: parent.familyTree }).populate([
					"lineage",
					"branches",
					{
						path: "rootFamily",
						populate: {
							path: "member"
						}
					},
					"founder",
					"familyHead",
					"spouse"
				]);

				results = {
					actions: filter.actions,
					familyTree
				};

				return NextResponse.json({ results, message: "family trees successfully retrieved." }, { status: 200 });
			case "all family trees":
				options = {};
				totalDocuments = await FamilyTree.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);

				familyTrees = await FamilyTree.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					actions: filter.actions,
					familyTrees
				};

				return NextResponse.json({ results, message: "family trees successfully retrieved." }, { status: 200 });
			case "search family trees":
				const searchTerms = data.query.split(" ").filter(Boolean);

				options = {
					$or: searchTerms.map((term) => ({
						name: { $regex: term, $options: "i" }
					}))
				};
				totalDocuments = await FamilyTree.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);

				familyTrees = await FamilyTree.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					totalPages,
					actions: filter.actions,
					familyTrees
				};

				const queryExists = await SearchQuery.findOne({ query: data.query, section: data.section, user: data.user, userType: data.userType });
				console.log("queryExists", queryExists);

				if (!queryExists) {
					await SearchQuery.create(data);
				}

				return NextResponse.json({ results, message: "family trees successfully retrieved." }, { status: 200 });
			default:
				throw new Error("Filter Action is not recogized.");
		}
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

		const { update, treeId } = data;

		if (!treeId) throw new Error("family tree id is required.");

		const familyTree = await FamilyTree.findByIdAndUpdate({ _id: treeId }, update, { true: true });

		return NextResponse.json({ message: "Family tree successfully updated." }, { status: 200 });
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

		const { treeId } = data;

		if (!treeId) throw new Error("family tree ID is required.");

		const familyTree = await FamilyTree.findByIdAndDelete({ _id: treeId });

		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const imageDeleted = await deleteImage(familyTree?.crest?.publicId);

		console.log("family crest deleted", imageDeleted.success);

		return NextResponse.json({ message: "family tree was successfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
