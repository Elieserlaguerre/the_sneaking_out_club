import cloudinary from "@/app/lib/cloudinary";
import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Comment from "@/app/lib/models/Comment";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Post from "@/app/lib/models/Post";
import Reaction from "@/app/lib/models/Reaction";
import Teacher from "@/app/lib/models/Teacher";
import mongoose from "mongoose";
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

export async function DELETE(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { postId, userId } = data;

		const post = await Post.findById({ _id: data.postId });

		if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });

		if (post.creator.toString() !== userId) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

		const session = await mongoose.startSession();

		try {
			await session.withTransaction(async () => {
				if (post.media?.publicId) {
					await cloudinary.uploader.destroy(post.media.publicId, {
						resource_type: post.type === "video" ? "video" : "image"
					});
				}

				await Comment.deleteMany({ post: postId }, { session });

				await Reaction.deleteMany({ post: postId }, { session });

				await Post.deleteOne({ _id: postId }, { session });
			});
		} finally {
			await session.endSession();
		}

		return NextResponse.json({ message: "Your post was successfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
