import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Group from "@/app/lib/models/Group";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
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

		const { groupId } = data;

		const group = await Group.findById(groupId);

		// console.log("group", group);

		if (!group) return NextResponse.json({ message: "group not found." }, { status: 404 });

		return NextResponse.json({ results: group, message: "group successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
