import { verifyPassword } from "@/app/lib/auth/helpers";
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
		// console.log("login route data:", data);

		const { email, password, department } = data;

		let user, passwordMatch, verifiedUser;

		switch (department) {
			case "members":
				user = await Member.findOne({ email }).lean();

				if (!user) {
					// console.log("user", user);
					return NextResponse.json({ message: "User not found." }, { status: 404 });
				}

				if (user.status === "suspended") return NextResponse.json({ message: "Access denied due to suspension." }, { status: 401 });

				if (user.status === "expelled") return NextResponse.json({ message: "Access denied due to expulsion." }, { status: 401 });

				passwordMatch = await verifyPassword(data);
				// console.log("passwordMatch", passwordMatch);

				if (passwordMatch.verified === false) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

				verifiedUser = {
					...user,
					password
				};

				return NextResponse.json({ results: verifiedUser, message: "User Verified." }, { status: 200 });

			case "parents":
				user = await Parent.findOne({ email }).lean();

				if (!user) {
					console.log("user", user);
					return NextResponse.json({ message: "User not found." }, { status: 404 });
				}

				if (user.status === "suspended") return NextResponse.json({ message: "Access denied due to suspension." }, { status: 401 });

				if (user.status === "expelled") return NextResponse.json({ message: "Access denied due to expulsion." }, { status: 401 });

				passwordMatch = await verifyPassword(data);
				// console.log("passwordMatch", passwordMatch);

				if (passwordMatch.verified === false) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

				verifiedUser = {
					...user,
					password
				};

				return NextResponse.json({ results: verifiedUser, message: "User Verified." }, { status: 200 });

			case "teachers":
				user = await Teacher.findOne({ email }).lean();

				if (!user) {
					return NextResponse.json({ message: "User not found." }, { status: 404 });
				}

				if (user.status === "suspended") return NextResponse.json({ message: "Access denied due to suspension." }, { status: 401 });

				if (user.status === "expelled") return NextResponse.json({ message: "Access denied due to expulsion." }, { status: 401 });

				passwordMatch = await verifyPassword(data);
				// console.log("passwordMatch", passwordMatch);

				if (passwordMatch.verified === false) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

				verifiedUser = {
					...user,
					password
				};

				return NextResponse.json({ results: verifiedUser, message: "User Verified." }, { status: 200 });

			case "admin":
				user = await Admin.findOne({ email }).lean();

				if (!user) {
					return NextResponse.json({ message: "User not found." }, { status: 404 });
				}

				if (user.status === "suspended") return NextResponse.json({ message: "Access denied due to suspension." }, { status: 401 });

				if (user.status === "expelled") return NextResponse.json({ message: "Access denied due to expulsion." }, { status: 401 });

				passwordMatch = await verifyPassword(data);
				// console.log("passwordMatch", passwordMatch);

				if (passwordMatch.verified === false) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

				verifiedUser = {
					...user,
					password
				};

				return NextResponse.json({ results: verifiedUser, message: "User Verified." }, { status: 200 });

			case "careers":
				user = await Applicant.findOne({ email }).lean();

				if (!user) {
					return NextResponse.json({ message: "User not found." }, { status: 404 });
				}

				if (user.status === "suspended") return NextResponse.json({ message: "Access denied due to suspension." }, { status: 401 });

				if (user.status === "expelled") return NextResponse.json({ message: "Access denied due to expulsion." }, { status: 401 });

				passwordMatch = await verifyPassword(data);
				// console.log("passwordMatch", passwordMatch);

				if (passwordMatch.verified === false) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

				verifiedUser = {
					...user,
					password
				};

				return NextResponse.json({ results: verifiedUser, message: "User Verified." }, { status: 200 });

			default:
				return NextResponse.json({ message: "Department no recognized." }, { status: 400 });
		}
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
