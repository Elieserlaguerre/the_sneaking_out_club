import db from "@/app/lib/database";
import Parent from "@/app/lib/models/Parent";
import Post from "@/app/lib/models/Post";
import SavedItem from "@/app/lib/models/SavedItem";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const alreadySaved = await SavedItem.findOne(data);

		if (alreadySaved) return NextResponse.json({ message: "Your Post is already saved." }, { status: 200 });

		await SavedItem.create(data);

		await Post.findByIdAndUpdate(data.content, {
			$inc: {
				saveCount: 1
			}
		});

		return NextResponse.json({ message: "Post successfully saved." }, { status: 200 });
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
		console.log("data", data);

		const { userId } = data;

		const filter = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			user: userId
		};

		if (filter.contentType !== "all") options.contentType = filter.contentType;
		if (filter.collection) options.location = filter.collection;

		if (filter.sort === "newest") sort = { createdAt: -1 };
		else sort = { createdAt: 1 };

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await SavedItem.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);
		const posts = await SavedItem.find(options)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.populate([
				"content",
				{
					path: "content",
					populate: [
						{
							path: "creator",
							select: {
								image: 1,
								firstName: 1,
								lastName: 1
							}
						},
						"sharedPost"
					]
				}
			]);

		const results = {
			totalPages,
			posts
		};

		console.log("saved posts", results);

		return NextResponse.json({ results, message: "Saved Posts successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { itemId, userId } = data;

		const targetItem = await SavedItem.findOneAndDelete({
			_id: itemId,
			user: userId
		});

		await Post.findOneAndUpdate(
			{
				_id: targetItem.content,
				shareCount: { $gt: 0 }
			},
			{
				$inc: {
					saveCount: -1
				}
			}
		);

		return NextResponse.json({ message: "Saved Item successfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
