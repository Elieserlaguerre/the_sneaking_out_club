import UserProvider from "@/app/components/providers/UserProvider";
import db from "@/app/lib/database";
import Family from "@/app/lib/models/Family";
import FamilyTree from "@/app/lib/models/FamilyTree";
import Parent from "@/app/lib/models/Parent";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const familyTree = await FamilyTree.findById({ _id: data.familyTree });

		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const parent = await Parent.findById({ _id: data.creator });

		const householdData = {
			...data,
			slug: slugify(data.name)
		};

		const family = await Family.create(householdData);
		parent.family = family._id;
		await parent.save();

		familyTree.branches.push(family._id);
		await familyTree.save();

		/*
        ==================================================
        SEND NOTIFICATION ABOUT NEW FAMILY BRANCH ADDITION
        ==================================================
        */

		return NextResponse.json({ message: "New household successfully created." }, { status: 200 });
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

		if (!userId) throw new Error("user id required.");

		const filters = JSON.parse(data.filter);

		let page, limit, skip, totalDocuments, totalPages, options, sort, families, results;

		switch (filters.actions) {
			case "my family":
				const family = await Family.findOne({ creator: userId });
				if (!family) return NextResponse.json({ message: "family not found." }, { status: 404 });

				results = {
					actions: filters.actions,
					family
				};

				return NextResponse.json({ results, message: "your family successfully retrieved." }, { status: 200 });
			case "all families":
				options = {};

				page = parseInt(data.page) || 1;
				limit = parseInt(data.limit) || 10;
				skip = (page - 1) * limit;
				totalDocuments = await Family.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				families = await Family.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					actions: filters.actions,
					totalPages,
					families
				};
				return NextResponse.json({ results, message: "family branches successfully retrieved" }, { status: 200 });
			case "search families":
				options = {
					name: data.query
				};

				page = parseInt(data.page) || 1;
				limit = parseInt(data.limit) || 10;
				skip = (page - 1) * limit;
				totalDocuments = await Family.countDocuments(options);
				totalPages = Math.ceil(totalDocuments / limit);
				families = await Family.find(options).skip(skip).limit(limit).sort(sort);
				results = {
					actions: filters.actions,
					totalPages,
					families
				};
				
				return NextResponse.json({ results, message: "Get route successfully accessed." }, { status: 200 });
			default:
				throw new Error("filter action is not authorized.");
		}
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { familyId, update } = data;
		if (!familyId) return NextResponse.json({ message: "family ID not found" }, { status: 404 });
		if (!update) return NextResponse.json({ message: "family update data is required." }, { status: 400 });

		const family = await Family.findByIdAndUpdate({ _id: familyId }, update, { new: true });
		if (!family) return NextResponse.json({ message: "famiy household not found." }, { status: 404 });

		return NextResponse.json({ message: "House was successfully updated." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		return NextResponse.json({ message: "POST route successfully accessed." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
