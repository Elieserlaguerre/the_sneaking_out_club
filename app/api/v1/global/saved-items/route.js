import db from "@/app/lib/database";
import SavedItem from "@/app/lib/models/SavedItem";
import { CONTENT_MAP } from "@/app/lib/util/backend/variables";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const itemExists = await CONTENT_MAP[data.contentType].findById({ _id: data.content });

		if (itemExists) return NextResponse.json({ message: "You've already saved this item." }, { status: 400 });

		await SavedItem.create(data);

		return NextResponse.json({ message: "Item successfully saved." }, { status: 200 });
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

		return NextResponse.json({ message: "saved items successfully retrieved." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
