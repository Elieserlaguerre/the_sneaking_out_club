import db from "@/app/lib/database";
import Group from "@/app/lib/models/Group";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		console.log("data", data);

		const { groupId } = data;

		const group = await Group.findById(groupId).populate([
			{
				path: "members.member",
				select: {
					firstName: 1,
					lastName: 1,
					image: 1
				}
			},
			{
				path: "managers.manager",
				select: {
					firstName: 1,
					lastName: 1,
					image: 1
				}
			},
			{
				path: "owner",
				select: {
					firstName: 1,
					lastName: 1,
					image: 1,
					city: 1,
					state: 1,
					country: 1
				}
			}
		]);

		if (!group) return NextResponse.json({ message: "group not found." }, { status: 404 });

		console.log("group", group);

		return NextResponse.json({ results: group, message: "group details successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
