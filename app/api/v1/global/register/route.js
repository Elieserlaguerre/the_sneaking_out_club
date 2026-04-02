import { encryptPassword } from "@/app/lib/auth/helpers";
import { deleteImage, uploadImage } from "@/app/lib/cloudinary/helpers";
import db from "@/app/lib/database";
import Admin from "@/app/lib/models/Admin";
import Applicant from "@/app/lib/models/Applicant";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Teacher from "@/app/lib/models/Teacher";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { user, department } = data;

		const newUser = {
			...user,
			cloudinarySubfolder: `the_sneaking_out_club/${slugify(`${user.firstName} ${user.lastName}`)}/${department}`
		};

		let createdUser;

		switch (department) {
			case "members":
				newUser.password = await encryptPassword(user.password);
				createdUser = await Member.create(newUser);
				return NextResponse.json({ results: createdUser, message: "New user was successfully created: " }, { status: 200 });
			case "parents":
				newUser.password = await encryptPassword(user.password);
				createdUser = await Parent.create(newUser);
				return NextResponse.json({ results: createdUser, message: "New user was successfully created: " }, { status: 200 });
			case "teachers":
				newUser.password = await encryptPassword(user.password);
				createdUser = await Teacher.create(newUser);
				return NextResponse.json({ results: createdUser, message: "New user was successfully created: " }, { status: 200 });
			case "admin":
				newUser.password = await encryptPassword(user.password);
				createdUser = await Admin.create(newUser);
				return NextResponse.json({ results: createdUser, message: "New user was successfully created: " }, { status: 200 });
			case "careers":
				newUser.password = await encryptPassword(user.password);
				createdUser = await Applicant.create(newUser);
				return NextResponse.json({ results: createdUser, message: "New user was successfully created: " }, { status: 200 });
			default:
				return NextResponse.json({ message: "department not recognized" }, { status: 400 });
		}
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
		// console.log("data", data);

		const { userId, department } = data;

		let user;

		switch (department) {
			case "members":
				user = await Member.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s info was successfully retrieved.` }, { status: 200 });
			case "parents":
				user = await Parent.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s info was successfully retrieved.` }, { status: 200 });
			case "teachers":
				user = await Teacher.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s info was successfully retrieved.` }, { status: 200 });
			case "admin":
				user = await Admin.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s info was successfully retrieved.` }, { status: 200 });
			case "careers":
				user = await Applicant.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s info was successfully retrieved.` }, { status: 200 });
			default:
				return NextResponse.json({ message: "Department not recognized." }, { status: 400 });
		}
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await db.connect();

		const formData = await req.formData();
		// console.log("formData", formData);

		const image = formData.get("image"); // ✅ File object
		const dateOfBirth = formData.get("dateOfBirth");
		const age = Number(formData.get("age"));
		const nationality = formData.get("nationality");
		const gender = formData.get("gender");
		const introduction = formData.get("introduction");
		const cloudinarySubfolder = formData.get("cloudinarySubfolder");
		const department = formData.get("department");
		const userId = formData.get("userId");
		let user, update;

		update = {
			dateOfBirth,
			age,
			nationality,
			gender,
			introduction,
			image: await uploadImage(image, cloudinarySubfolder)
		};

		switch (department) {
			case "members":
				user = await Member.findByIdAndUpdate({ _id: userId }, update, { returnDocument: "after" });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s account was successfully updated.` }, { status: 200 });
			case "parents":
				user = await Parent.findByIdAndUpdate({ _id: userId }, update, { returnDocument: "after" });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s account was successfully updated.` }, { status: 200 });
			case "teachers":
				user = await Teacher.findByIdAndUpdate({ _id: userId }, update, { returnDocument: "after" });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s account was successfully updated.` }, { status: 200 });
			case "admin":
				user = await Admin.findByIdAndUpdate({ _id: userId }, update, { returnDocument: "after" });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s account was successfully updated.` }, { status: 200 });
			case "careers":
				user = await Applicant.findByIdAndUpdate({ _id: userId }, update, { returnDocument: "after" });

				if (!user) return NextResponse.json({ message: "user not found." }, { status: 404 });

				return NextResponse.json({ results: user, message: `${user.firstName}'s account was successfully updated.` }, { status: 200 });
			default:
				return NextResponse.json({ message: "depatment not recognized." }, { status: 400 });
		}
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
		// console.log("data", data);

		const { userId, department } = data;
		let user;
		switch (department) {
			case "members":
				user = await Member.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user does not exist." }, { status: 400 });

				if (user.image.publicId) {
					const deletedImage = await deleteImage(user.image.publicId);
					console.log("deleted image:", deletedImage);
				}

				await user.deleteOne();

				return NextResponse.json({ message: `${user.firstName}'s account was successfully deleted.` }, { status: 200 });
			case "parents":
				user = await Parent.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user does not exist." }, { status: 400 });

				if (user.image.publicId) {
					const deletedImage = await deleteImage(user.image.publicId);
					console.log("deleted image:", deletedImage);
				}

				await user.deleteOne();

				return NextResponse.json({ message: `${user.firstName}'s account was successfully deleted.` }, { status: 200 });
			case "teachers":
				user = await Teacher.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user does not exist." }, { status: 400 });

				if (user.image.publicId) {
					const deletedImage = await deleteImage(user.image.publicId);
					console.log("deleted image:", deletedImage);
				}

				await user.deleteOne();

				return NextResponse.json({ message: `${user.firstName}'s account was successfully deleted.` }, { status: 200 });
			case "admin":
				user = await Admin.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user does not exist." }, { status: 400 });

				if (user.image.publicId) {
					const deletedImage = await deleteImage(user.image.publicId);
					console.log("deleted image:", deletedImage);
				}

				await user.deleteOne();

				return NextResponse.json({ message: `${user.firstName}'s account was successfully deleted.` }, { status: 200 });
			case "careers":
				user = await Applicant.findById({ _id: userId });

				if (!user) return NextResponse.json({ message: "user does not exist." }, { status: 400 });

				if (user.image.publicId) {
					const deletedImage = await deleteImage(user.image.publicId);
					console.log("deleted image:", deletedImage);
				}

				await user.deleteOne();

				return NextResponse.json({ message: `${user.firstName}'s account was successfully deleted.` }, { status: 200 });
			default:
				return NextResponse.json({ message: "department is not recognized" }, { status: 400 });
		}
	} catch (error) {
		console.log("DELETE route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
