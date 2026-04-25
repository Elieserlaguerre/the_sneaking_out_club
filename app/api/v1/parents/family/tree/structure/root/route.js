import { deleteImage } from "@/app/lib/cloudinary/helpers/backend";
import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import FamilyMembership from "@/app/lib/models/FamilyMembership";
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
		// console.log("root family data", data);

		const { parentId, treeId } = data;

		const filter = JSON.parse(data.filters);

		if (!parentId) return NextResponse.json({ message: "parent id is required." }, { status: 400 });

		if (!treeId) return NextResponse.json({ message: "tree id is required." }, { status: 400 });

		const familyTree = await FamilyTree.findById({ _id: treeId });

		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		const rootFamilyIds = familyTree.rootFamily.map((family) => family.member);

		let page, limit, skip, options, sort;

		options = {
			familyTree: treeId,
			_id: { $nin: rootFamilyIds }
		};

		page = parseInt(data.page) || 1;
		limit = parseInt(data.limit) || 10;
		skip = (page - 1) * limit;

		const [familyMemberships, members, parents, teachers, admins] = await Promise.all([FamilyMembership.find(options), Member.find(options), Parent.find(options), Teacher.find(options), Admin.find(options)]);

		const rootFamily = [].concat(familyMemberships, members, parents, teachers, admins);
		// console.log("rootFamily", rootFamily);

		rootFamily.sort((a, b) => {
			return filter?.sort === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
		});

		const totalDocuments = rootFamily.length;
		const totalPages = Math.ceil(totalDocuments / limit);

		const paginated = rootFamily.slice(skip, skip + limit);

		const results = {
			totalPages,
			rootFamily: paginated
		};

		console.log("results", results);

		return NextResponse.json({ results, message: "get root family members" }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();
		let data, rootMember;
		data = await req.json();
		console.log("data", data);

		const { action, memberId, treeId, userType } = data;

		if (!action) return NextResponse.json({ message: "membership action is required" }, { status: 400 });

		if (!memberId) return NextResponse.json({ message: "memberId is required for root family membership management." }, { status: 400 });

		if (!treeId) return NextResponse.json({ message: "family tree id is required." }, { status: 400 });

		if (!userType) return NextResponse.json({ message: "user type is required." }, { status: 400 });

		const familyTree = await FamilyTree.findById({ _id: treeId });

		if (!familyTree) return NextResponse.json({ message: "family tree not found." }, { status: 404 });

		switch (userType) {
			case "Parent":
				rootMember = await Parent.findById({ _id: memberId });
				if (!rootMember) return NextResponse.json({ message: "user not be found." }, { status: 404 });

				switch (action) {
					case "add":
						if (familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} has already been added to the root family.` }, { status: 400 });

						familyTree.rootFamily.push({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					case "remove":
						if (!familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} is not currently in the root family.` }, { status: 400 });

						familyTree.rootFamily.pull({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					default:
						throw new Error("membership action is not recognized.");
				}
				break;
			case "Family_Membership":
				rootMember = await FamilyMembership.findById({ _id: memberId });
				if (!rootMember) return NextResponse.json({ message: "user not be found." }, { status: 404 });

				switch (action) {
					case "add":
						if (familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} has already been added to the root family.` }, { status: 400 });

						familyTree.rootFamily.push({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					case "remove":
						if (!familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} is not currently in the root family.` }, { status: 400 });

						familyTree.rootFamily.pull({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					default:
						throw new Error("membership action is not recognized.");
				}
				break;
			case "Member":
				rootMember = await Member.findById({ _id: memberId });
				if (!rootMember) return NextResponse.json({ message: "user not be found." }, { status: 404 });

				switch (action) {
					case "add":
						if (familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} has already been added to the root family.` }, { status: 400 });

						familyTree.rootFamily.push({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					case "remove":
						if (!familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} is not currently in the root family.` }, { status: 400 });

						familyTree.rootFamily.pull({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					default:
						throw new Error("membership action is not recognized.");
				}
				break;
			case "Teacher":
				rootMember = await Teacher.findById({ _id: memberId });
				if (!rootMember) return NextResponse.json({ message: "user not be found." }, { status: 404 });

				switch (action) {
					case "add":
						if (familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} has already been added to the root family.` }, { status: 400 });

						familyTree.rootFamily.push({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					case "remove":
						if (!familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} is not currently in the root family.` }, { status: 400 });

						familyTree.rootFamily.pull({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					default:
						throw new Error("membership action is not recognized.");
				}
				break;
			case "Admin":
				rootMember = await Admin.findById({ _id: memberId });
				if (!rootMember) return NextResponse.json({ message: "user not be found." }, { status: 404 });

				switch (action) {
					case "add":
						if (familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} has already been added to the root family.` }, { status: 400 });

						familyTree.rootFamily.push({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					case "remove":
						if (!familyTree.rootFamily.some((family) => family.member.toString() === memberId.toString())) return NextResponse.json({ message: `${rootMember.firstName} is not currently in the root family.` }, { status: 400 });

						familyTree.rootFamily.pull({ member: rootMember._id, memberType: rootMember.docType });
						await familyTree.save();

						break;
					default:
						throw new Error("membership action is not recognized.");
				}
				break;
			default:
				throw new Error("User type is not recognized.");
		}

		return NextResponse.json({ message: `${rootMember.firstName} ${rootMember.lastName} has successfully been ${action === "add" ? "added to" : "removed from"} the root family's list.` }, { status: 200 });
	} catch (error) {
		console.log("PATCH route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
		await db.connect();
		let data, user, deletedImage;
		data = await req.json();
		console.log("data", data);

		const { memberId, memberType, treeId } = data;

		if (!memberId) return NextResponse.json({ message: "memberId is required." }, { status: 400 });
		if (!memberType) return NextResponse.json({ message: "memberType is required." }, { status: 400 });
		if (!treeId) return NextResponse.json({ message: "treeId is required." }, { status: 400 });

		const familyTree = await FamilyTree.findById({ _id: treeId });

		switch (memberType) {
			case "Family_Membership":
				user = await FamilyMembership.findById({ _id: memberId });
				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				console.log("delete user", user);
				if (user) {
					deletedImage = await deleteImage(user?.image?.publicId);
					console.log("deletedImage", deletedImage);

					familyTree.rootFamily.pull({ member: user._id, memberType: user.docType });
					await familyTree.save();

					await user.deleteOne();
				}
				break;
			case "Parent":
				user = await Parent.findById({ _id: memberId });
				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				if (user) {
					deletedImage = await deleteImage(user?.image?.publicId);
					console.log("deletedImage", deletedImage);

					familyTree.rootFamily.pull({
						member: user._id,
						memberType: user.docType
					});
					await familyTree.save();

					await user.deleteOne();
				}
				break;
			case "Member":
				user = await Member.findById({ _id: memberId });
				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				if (user) {
					deletedImage = await deleteImage(user?.image?.publicId);
					console.log("deletedImage", deletedImage);

					familyTree.rootFamily.pull({
						member: user._id,
						memberType: user.docType
					});
					await familyTree.save();

					await user.deleteOne();
				}
				break;
			case "Teacher":
				user = await Teacher.findById({ _id: memberId });
				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				if (user) {
					deletedImage = await deleteImage(user?.image?.publicId);
					console.log("deletedImage", deletedImage);

					familyTree.rootFamily.pull({
						member: user._id,
						memberType: user.docType
					});
					await familyTree.save();

					await user.deleteOne();
				}
				break;
			case "Admin":
				user = await Admin.findById({ _id: memberId });
				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				if (user) {
					deletedImage = await deleteImage(user?.image?.publicId);
					console.log("deletedImage", deletedImage);

					familyTree.rootFamily.pull({
						member: user._id,
						memberType: user.docType
					});
					await familyTree.save();

					await user.deleteOne();
				}
				break;
			default:
				throw new Error("memberType not recognized.");
		}

		return NextResponse.json({ message: "Member has been deleted from the root family." }, { status: 200 });
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
