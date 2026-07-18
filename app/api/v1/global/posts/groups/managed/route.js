import db from "@/app/lib/database";
import Group from "@/app/lib/models/Group";
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

		options = {
			$or: [
				{
					owner: data.userId
				},
				{
					"managers.manager": data.userId
				}
			]
		};

		const filters = JSON.parse(data.filters);

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Group.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const groups = await Group.find(options).skip(skip).limit(limit).sort(sort).lean();
		const results = {
			totalPages,
			groups
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "managed groups successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
