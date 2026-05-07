import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import FamilyMember from "@/app/lib/models/FamilyMember";
import FamilyMembership from "@/app/lib/models/FamilyMember";
import FamilyTree from "@/app/lib/models/FamilyTree";
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

		const { treeId } = data;

		if (!treeId) throw new Error("family tree ID is required.");

		const familyTree = await FamilyTree.findById({ _id: treeId });

		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const filters = JSON.parse(data.filters);

		let page, limit, skip, totalDocuments, totalPages, options, sort;

		options = {
			$or: [{ familyTree: treeId }, { creator: familyTree.creator }]
		};

		if (familyTree.founder && !familyTree.familyHead && !familyTree.spouse) {
			options = {
				...options,
				_id: { $nin: [familyTree.founder] }
			};
		}

		if (familyTree.founder && familyTree.familyHead && !familyTree.spouse) {
			options = {
				...options,
				_id: { $nin: [familyTree.founder, familyTree.familyHead] }
			};
		}

		if (familyTree.founder && familyTree.familyHead && familyTree.spouse) {
			options = {
				...options,
				_id: { $nin: [familyTree.founder, familyTree.familyHead, familyTree.spouse] }
			};
		}

		const leaderSearch = [];
		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;

		const [familyMembers, members, parents, teachers, admin] = await Promise.all([FamilyMember.find(options), Member.find(options), Parent.find(options), Teacher.find(options), Admin.find(options)]);

		const candidates = leaderSearch.concat(familyMembers, members, parents, teachers, admin);

		candidates.sort((a, b) => {
			return filters?.sort === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
		});

		totalDocuments = candidates.length;
		totalPages = Math.ceil(totalDocuments / limit);

		const paginatedCandidates = candidates.slice(skip, skip + limit);

		const results = {
			totalPages,
			candidates: paginatedCandidates
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "family tree leadership candidates successfully retrieved." }, { status: 200 });
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

		const { leaderType, action, treeId, memberId, memberType } = data;

		if (!leaderType) return NextResponse.json({ message: "leader type is required" }, { status: 400 });
		if (!action) return NextResponse.json({ message: "family leadership action is required" }, { status: 400 });
		if (!treeId) return NextResponse.json({ message: "family tree ID is required" }, { status: 400 });
		if (!memberId) return NextResponse.json({ message: "family member ID is required" }, { status: 400 });
		if (!memberType) return NextResponse.json({ message: "family member type is required" }, { status: 400 });

		const familyTree = await FamilyTree.findById({ _id: treeId });
		if (!familyTree) return NextResponse.json({ message: "family tree not found" }, { status: 404 });

		switch (leaderType) {
			case "founder":
				if (action === "add") {
					familyTree.set({
						founder: memberId,
						founderType: memberType
					});
					await familyTree.save();
				} else {
					familyTree.set({
						founder: null,
						founderType: null
					});
					await familyTree.save();
				}
				break;
			case "current head":
				if (action === "add") {
					familyTree.set({
						familyHead: memberId,
						familyHeadType: memberType
					});
					await familyTree.save();
				} else {
					familyTree.set({
						familyHead: null,
						familyHeadType: null
					});
					await familyTree.save();
				}
				break;
			case "spouse":
				if (action === "add") {
					familyTree.set({
						spouse: memberId,
						spouseType: memberType
					});
					await familyTree.save();
				} else {
					familyTree.set({
						spouse: null,
						spouseType: null
					});
					await familyTree.save();
				}
				break;
			default:
				break;
		}

		return NextResponse.json({ message: "family tree leadership successfully updated." }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
