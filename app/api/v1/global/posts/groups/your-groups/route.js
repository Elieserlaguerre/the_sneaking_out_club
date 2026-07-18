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
		console.log("data", data);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			$or: [
				{
					owner: data.userId
				},
				{
					"members.member": data.userId
				},
				{
					"managers.manager": data.userId
				}
			]
		};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Group.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const groups = await Group.find(options).skip(skip).limit(limit).sort(sort);
		const results = {
			totalDocuments,
			totalPages,
			groups
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "Your groups were successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
