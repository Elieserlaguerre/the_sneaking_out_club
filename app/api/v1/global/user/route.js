import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Applicant from "@/app/lib/models/Applicant";
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

		const { userId, department } = data;

		if (!userId) return NextResponse.json({ message: "user ID is missing." }, { status: 404 });

		if (!userId) return NextResponse.json({ message: "department is required." }, { status: 404 });

		let user;

		switch (department) {
			case "members":
				user = await Member.findById({ _id: userId }).select({ password: 0 });
				user.online = true;
				user.save();

				return NextResponse.json({ results: user, message: "Current User successfully retrieved." }, { status: 200 });
			case "parents":
				user = await Parent.findById({ _id: userId }).select({ password: 0 });
				user.online = true;
				user.save();

				return NextResponse.json({ results: user, message: "Current User successfully retrieved." }, { status: 200 });
			case "teachers":
				user = await Teacher.findById({ _id: userId }).select({ password: 0 });
				user.online = true;
				user.save();

				return NextResponse.json({ results: user, message: "Current User successfully retrieved." }, { status: 200 });
			case "admin":
				user = await Admin.findById({ _id: userId }).select({ password: 0 });
				user.online = true;
				user.save();

				return NextResponse.json({ results: user, message: "Current User successfully retrieved." }, { status: 200 });
			case "careers":
				user = await Applicant.findById({ _id: userId }).select({ password: 0 });
				user.online = true;
				user.save();

				return NextResponse.json({ results: user, message: "Current User successfully retrieved." }, { status: 200 });
			default:
				return NextResponse.json({ message: "Department not recognized." }, { status: 400 });
		}
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
