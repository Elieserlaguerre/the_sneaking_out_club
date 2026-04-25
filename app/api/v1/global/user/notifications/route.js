import db from "@/app/lib/database";
import Notification from "@/app/lib/models/Notification";
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

		const { userId, department } = data;

		const filters = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			to: userId
		};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;
		totalDocuments = await Notification.countDocuments(options);
		totalPages = Math.ceil(totalDocuments / limit);

		const notifications = await Notification.find(options)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.populate([
				{
					path: "from",
					select: {
						firstName: 1,
						lastName: 1,
						image: 1
					}
				}
			]);

		const results = {
			totalNotifications: totalDocuments,
			totalPages,
			notifications
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "User notifications successfully retrieved." }, { status: 200 });
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

		const { notificationId } = data;

		if (!notificationId) return NextResponse.json({ message: "notificationId is missing." }, { status: 404 });

		await Notification.findByIdAndDelete({ _id: notificationId });

		return NextResponse.json({ message: "Notification was sucessfully deleted." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
