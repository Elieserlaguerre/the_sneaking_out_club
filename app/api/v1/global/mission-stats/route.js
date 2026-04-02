import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Applicant from "@/app/lib/models/Applicant";
import Assignment from "@/app/lib/models/Assignment";
import Event from "@/app/lib/models/Event";
import JobApplication from "@/app/lib/models/JobApplication";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Teacher from "@/app/lib/models/Teacher";
import { nanoid } from "nanoid";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		await db.connect();

		const query = req.nextUrl.searchParams;
		const { department } = Object.fromEntries(query.entries());

		if (!department) {
			return NextResponse.json({ message: "department not found." }, { status: 404 });
		}

		let stats = [];

		switch (department) {
			// =========================
			// 🟦 MEMBERS
			// =========================
			case "members":
				stats = [
					{
						id: nanoid(),
						label: "active members",
						value: await Member.countDocuments({ status: "active" })
					},
					{
						id: nanoid(),
						label: "assignments completed",
						value: await Assignment.countDocuments({ status: "completed" })
					},
					{
						id: nanoid(),
						label: "events hosted",
						value: await Event.countDocuments({ type: "completed" })
					},
					{
						id: nanoid(),
						label: "upcoming opportunities",
						value: await Event.countDocuments({ type: "upcoming" })
					}
				];
				break;

			// =========================
			// 🟧 PARENTS
			// =========================
			case "parents":
				stats = [
					{
						id: nanoid(),
						label: "registered parents",
						value: await Parent.countDocuments()
					},
					{
						id: nanoid(),
						label: "students monitored",
						value: await Member.countDocuments()
					},
					{
						id: nanoid(),
						label: "assignments tracked",
						value: await Assignment.countDocuments()
					},
					{
						id: nanoid(),
						label: "parent-teacher interactions",
						value: 0 // later: messages or meetings count
					}
				];
				break;

			// =========================
			// 🟩 TEACHERS
			// =========================
			case "teachers":
				stats = [
					{
						id: nanoid(),
						label: "active teachers",
						value: await Teacher.countDocuments()
					},
					{
						id: nanoid(),
						label: "students supported",
						value: await Member.countDocuments()
					},
					{
						id: nanoid(),
						label: "assignments created",
						value: await Assignment.countDocuments({ createdByRole: "teacher" })
					},
					{
						id: nanoid(),
						label: "tutoring sessions",
						value: 0 // later: sessions collection
					}
				];
				break;

			// =========================
			// 🟪 ADMIN
			// =========================
			case "admin":
				stats = [
					{
						id: nanoid(),
						label: "total users",
						value: (await Member.countDocuments()) + (await Parent.countDocuments()) + (await Teacher.countDocuments())
					},
					{
						id: nanoid(),
						label: "events created",
						value: await Event.countDocuments()
					},
					{
						id: nanoid(),
						label: "platform activity",
						value: await Assignment.countDocuments()
					},
					{
						id: nanoid(),
						label: "system administrators",
						value: await Admin.countDocuments()
					}
				];
				break;

			// =========================
			// 🟦 CAREERS
			// =========================
			case "careers":
				stats = [
					{
						id: nanoid(),
						label: "total applicants",
						value: await Applicant.countDocuments()
					},
					{
						id: nanoid(),
						label: "open positions",
						value: 0 // later: job listings model
					},
					{
						id: nanoid(),
						label: "applications submitted",
						value: await JobApplication.countDocuments()
					},
					{
						id: nanoid(),
						label: "hiring activity",
						value: 0 // later: hired/reviewed
					}
				];
				break;

			default:
				return NextResponse.json({ message: "Department not recognized." }, { status: 400 });
		}

		// console.log("stats", stats);

		return NextResponse.json({ results: stats, message: "Mission stats successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
