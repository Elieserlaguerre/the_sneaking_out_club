import db from "@/app/lib/database";
import Post from "@/app/lib/models/Post";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const originalPost = await Post.findById({ _id: data.sharedPost });

		// console.log("origional post", originalPost);

		if (!originalPost) return NextResponse.json({ message: "Post not found." }, { status: 404 });

		const rootPostId = originalPost.type === "share" ? originalPost.sharedPost : originalPost._id;

		const existingShare = await Post.findOne({
			type: "share",
			creator: data.creator,
			sharedPost: rootPostId
		});

		if (existingShare) return NextResponse.json({ message: "Post already shared." }, { status: 200 });

		await Post.create({ ...data, sharedPost: rootPostId });

		await Post.findByIdAndUpdate(rootPostId, {
			$inc: {
				shareCount: 1
			}
		});

		return NextResponse.json({ message: "POST successfully shared." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);

		if (error.code === 11000) return NextResponse.json({ message: "Post already shared." }, { status: 200 });

		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
