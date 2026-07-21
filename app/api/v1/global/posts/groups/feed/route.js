import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Group from "@/app/lib/models/Group";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Post from "@/app/lib/models/Post";
import Teacher from "@/app/lib/models/Teacher";
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

		const { userId, userType } = data;

		const groups = await Group.find({
			$or: [
				{
					owner: userId
				},
				{
					members: {
						$elemMatch: {
							member: userId,
							memberType: userType
						}
					}
				}
			]
		}).select("_id");

		// console.log("groups", groups);

		const ids = groups.map((g) => g._id);

		// console.log("ids", ids);

		let page, limit, skip, options;

		options = {
			section: { $in: ids },
			sectionType: "Group"
		};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;

		const posts = await Post.find(options)
			.skip(skip)
			.limit(limit)
			.sort({
				createdAt: -1
			})
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

		// console.log("posts", posts);

		return NextResponse.json({ results: posts, message: "Group feed successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
