import db from "@/app/lib/database";
import Comment from "@/app/lib/models/Comment";
import Reaction from "@/app/lib/models/Reaction";
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
			post: data.post,
			parentComment: data.comment
		};

		const filters = JSON.parse(data.filters);

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Comment.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const replies = await Comment.find(options)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.populate({
				path: "creator",
				select: {
					firstName: 1,
					lastName: 1,
					image: 1
				}
			})
			.lean();

		/*
                ===============
                GET COMMENT IDS
                ===============
                */

		const commentIds = replies.map((comment) => comment._id);

		/*
                ==================
                GET USER REACTIONS
                ==================
                */

		const reactions = await Reaction.find({
			user: data.userId,
			comment: { $in: commentIds }
		}).lean();

		/*
                =================
                CREATE LOOKUP MAP
                =================
                */

		const reactionMap = {};

		reactions.forEach((reaction) => {
			reactionMap[reaction.comment.toString()] = reaction;
		});

		/*
                ==================
                GET RESPONSE COUNT
                ==================
                */

		const responseCounts = await Comment.aggregate([
			{
				$match: {
					parentComment: {
						$in: commentIds
					}
				}
			},
			{
				$group: {
					_id: "$parentComment",
					count: { $sum: 1 }
				}
			}
		]);

		const responseCountMap = {};

		responseCounts.forEach((reply) => {
			responseCountMap[reply._id.toString()] = reply.count;
		});

		/*
                =========================
                MERGE COMMENTS + REACTION
                =========================
                */

		const formattedComments = replies.map((comment) => ({
			...comment,
			reaction: reactionMap[comment._id.toString()] || null,
			responseCount: responseCountMap[comment._id.toString()] || 0
		}));

		const results = {
			totalPages,
			comments: formattedComments
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "replies successfully retrieved" }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
