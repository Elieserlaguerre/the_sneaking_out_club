import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Comment from "@/app/lib/models/Comment";
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

		const post = await Post.findById({ _id: data.post });

		if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });

		await Comment.create(data);

		post.commentCount += 1;
		await post.save();

		return NextResponse.json({ message: "comment successfully created." }, { status: 200 });
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
		// console.log("comment data", data);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			post: data.post
		};

		const filters = JSON.parse(data.filters);

		if (filters.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Comment.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const comments = await Comment.find(options)
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

		const commentIds = comments.map((comment) => comment._id);

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
		=========================
		MERGE COMMENTS + REACTION
		=========================
		*/

		const formattedComments = comments.map((comment) => ({
			...comment,
			reaction: reactionMap[comment._id.toString()] || null
		}));

		const results = {
			totalPages,
			comments: formattedComments
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "comments successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data, reaction;
		data = await req.json();
		console.log("data", data);

		const comment = await Comment.findById({ _id: data.comment });

		reaction = await Reaction.findOne({ comment: data.comment, user: data.user });

		if (!reaction) {
			// CREATE NEW REACTION
			reaction = await Reaction.create(data);
			comment.reactionCounts[reaction.type] += 1;
			await comment.save();
		} else if (reaction.type !== data.type) {
			// CHANGE EXISTING REACTION
			if (comment.reactionCounts[reaction.type] > 0) comment.reactionCounts[reaction.type] -= 1;

			reaction.type = data.type;
			await reaction.save();

			comment.reactionCounts[data.type] += 1;
			await comment.save();
		} else {
			// TOGGLE OFF SAME REACTION
			if (comment.reactionCounts[reaction.type] > 0) {
				comment.reactionCounts[reaction.type] -= 1;
				await comment.save();
			}
			await reaction.deleteOne();
			reaction = null;
		}

		const total = Object.values(comment.reactionCounts).reduce((acc, val) => acc + val, 0);
		comment.totalReactions = total;
		await comment.save();

		console.log("comment", comment);
		console.log("reaction", reaction);

		return NextResponse.json({ results: reaction, message: "Comment reaction successfully updated." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
