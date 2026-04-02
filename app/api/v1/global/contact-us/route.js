import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Message from "@/app/lib/models/Message";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const admin = await Admin.findOne({ status: "active" });

		const messageData = {
			...data,
			recipient: admin._id,
			recipientType: "Admin",
			messageType: "inbox"
		};

		const message = await Message.create(messageData);

		return NextResponse.json({ results: message, message: "message successfully sent." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
