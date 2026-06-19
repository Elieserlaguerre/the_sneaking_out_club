import db from "@/app/lib/database";
import SavedCollection from "@/app/lib/models/SavedCollection";
import { MODEL_MAP } from "@/app/lib/util/backend/variables";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const existingCollection = await SavedCollection.findOne({
			name: data.name,
			owner: data.owner,
			ownerType: data.ownerType
		});

		if (existingCollection) return NextResponse.json({ message: "Collection already exists." }, { status: 403 });

		await SavedCollection.create(data);

		return NextResponse.json({ message: "Collection successfully created." }, { status: 200 });
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

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			owner: data.userId
		};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await SavedCollection.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const collections = await SavedCollection.find(options).skip(skip).limit(limit).sort(sort);
		const results = {
			totalPages,
			collections
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "collection successfully retrieved." }, { status: 200 });
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

		const updatedCollection = await SavedCollection.findByIdAndUpdate(data.collectionId, data, { new: true });

		return NextResponse.json({ message: "collection successfully updated." }, { status: 200 });
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
		// console.log("delete data", data);

		const { collectionId, userId, userType } = data;

		const collection = await SavedCollection.findById(collectionId);
		const currentUser = await MODEL_MAP[userType].findById(userId);

		if (!collection) return NextResponse.json({ message: "collection not found." }, { status: 404 });
		if (!currentUser) return NextResponse.json({ message: "user not found." }, { status: 404 });

		if (collection.owner.toString() === currentUser._id.toString()) {
			await collection.deleteOne();
			return NextResponse.json({ message: "collection successfully deleted." }, { status: 200 });
		} else {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
