import db from "@/app/lib/database";
import SearchQuery from "@/app/lib/models/SearchQuery";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;

		data = Object.fromEntries(query.entries());
		// console.log("data", data);

		const { userId, section } = data;
		const filters = JSON.parse(data.filters);

		if (!userId) return NextResponse.json({ message: "user ID is required for search history" }, { status: 400 });
		if (!section) return NextResponse.json({ message: "section is required for search history" }, { status: 400 });

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			user: userId,
			section
		};

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data?.page) || 1;
		limit = parseInt(data?.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await SearchQuery.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const history = await SearchQuery.find(options).skip(skip).limit(limit).sort(sort);
		const results = {
			totalPages,
			history
		};

		return NextResponse.json({ results, message: "search history successfully retrieved." }, { status: 200 });
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

		const queryExists = await SearchQuery.findOne({ query: data.query, section: data.section, user: data.userId, userType: data.userType });

		if (!queryExists) await SearchQuery.create(data);

		return NextResponse.json({ message: "search history successfully created." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { searchId } = data;

		await SearchQuery.findByIdAndDelete({ _id: searchId });

		return NextResponse.json({ message: "search query was successfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
