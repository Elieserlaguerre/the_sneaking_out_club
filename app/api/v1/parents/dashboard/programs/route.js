import db from "@/app/lib/database";
import ProgramCategory from "@/app/lib/models/ProgramCategory";
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

		options = {};

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		if (filters?.status) options.status = filters.status;

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await ProgramCategory.countDocuments(options);
        totalPages = Math.ceil(totalDocuments / limit);        
		const categories = await ProgramCategory.find(options).skip(skip).limit(limit).sort(sort);
		const results = {
			totalPages,
			categories
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "Get route successfully accessed." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
