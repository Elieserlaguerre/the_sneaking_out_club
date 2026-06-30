import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Post from "@/app/lib/models/Post";
import Reaction from "@/app/lib/models/Reaction";
import Teacher from "@/app/lib/models/Teacher";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		await Post.create(data);

		return NextResponse.json({ message: "Your Post was successfully created." }, { status: 200 });
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

		const { userId } = data;

		if (!userId) return NextResponse.json({ message: "userId is required." }, { status: 400 });

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		const filters = JSON.parse(data.filters);

		options = {
			creator: userId
		};

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

		const postIds = posts.map((post) => post._id);

		const reactions = await Reaction.find({
			user: userId,
			post: { $in: postIds },
			comment: null
		}).lean();

		const reactionMap = {};

		reactions.forEach((reaction) => {
			reactionMap[reaction.post.toString()] = reaction;
		});

		const formattedPost = posts.map((post) => ({
			...post,
			reaction: reactionMap[post._id] || null
		}));

		const results = {
			totalPages,
			posts: formattedPost
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "Posts  successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
