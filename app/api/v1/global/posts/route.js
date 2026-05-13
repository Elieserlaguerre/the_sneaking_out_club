import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Post from "@/app/lib/models/Post";
import Reaction from "@/app/lib/models/Reaction";
import Teacher from "@/app/lib/models/Teacher";
import { NextResponse } from "next/server";

export async function PATCH(req) {
	try {
		await db.connect();
		let data, reaction;
		data = await req.json();
		// console.log("data", data);

		const targetPost = await Post.findById({ _id: data.post });

		reaction = await Reaction.findOne({ post: data.post, user: data.user });

		if (!reaction) {
			// CREATE NEW REACTION
			reaction = await Reaction.create(data);
			targetPost.reactionCounts[reaction.type] += 1;
		} else if (reaction.type !== data.type) {
			// CHANGE EXISTING REACTION
			targetPost.reactionCounts[reaction.type] -= 1;

			reaction.type = data.type;
			await reaction.save();

			targetPost.reactionCounts[data.type] += 1;
		} else {
			// TOGGLE OFF SAME REACTION
			targetPost.reactionCounts[reaction.type] -= 1;
			await reaction.deleteOne();
			reaction = null;
		}

		const total = Object.values(targetPost.reactionCounts).reduce((acc, val) => acc + val, 0);
		targetPost.totalReactions = total;
		await targetPost.save();

		// console.log("targetPost", targetPost);
		// console.log("reaction", reaction);

		return NextResponse.json({ results: reaction, message: "POST Reaction suceeded." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
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

		const reaction = await Reaction.findOne(data);

		return NextResponse.json({ results: reaction, message: "Post reaction successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
