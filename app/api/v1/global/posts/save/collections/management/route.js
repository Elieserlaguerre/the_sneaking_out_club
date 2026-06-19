import db from "@/app/lib/database";
import SavedCollection from "@/app/lib/models/SavedCollection";
import SavedItem from "@/app/lib/models/SavedItem";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		console.log("data", data);

		const filters = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			owner: data.userId
		};

		if (filters.exclude) options._id = { $ne: filters.exclude };
		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await SavedCollection.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);

		const collections = await SavedCollection.find(options).skip(skip).limit(limit).sort(sort).lean();
		const results = {
			totalPages,
			collections
		};

		console.log("results", results);

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

		const { savedItemId, collectionId } = data;

		const savedItem = await SavedItem.findById(savedItemId);

		if (!savedItem) return NextResponse.json({ message: "saved item not found." }, { status: 404 });

		const collection = await SavedCollection.findById(collectionId);

		if (!collection) return NextResponse.json({ message: "collection not found." }, { status: 404 });

		if (savedItem.user.toString() === collection.owner.toString()) {
			savedItem.location = collection._id;
			await savedItem.save();
		} else {
			return NextResponse.json({ message: "You're not authorized for this action." }, { status: 405 });
		}

		return NextResponse.json({ message: "Saved Item successfully added to collection." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
