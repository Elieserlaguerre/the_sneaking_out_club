import db from "@/app/lib/database";
import Post from "@/app/lib/models/Post";
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
					creator: data.groupId
				},
				{
					section: data.section,
					sectionType: data.sectionType
				}
			]
		};

		const filters = JSON.parse(data.filters);

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Post.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const posts = await Post.find(options)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.populate([
				{
					path: "creator",
					select: {
						firstName: 1,
						lastName: 1,
						image: 1,
						docType: 1
					}
				},
				"sharedPost",
				{
					path: "sharedPost",
					populate: ["sharedPost"]
				}
			])
            .lean();
        
		const results = {
			totalPages,
			posts
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "group posts successfully retrieved." }, { status: 200 });
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
		// console.log("group post data", data);

		await Post.create(data);

		return NextResponse.json({ message: "Group post successfully created." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
