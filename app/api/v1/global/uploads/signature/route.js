import { generateCloudinarySignature } from "@/app/lib/cloudinary/helpers";
import { NextResponse } from "next/server";
import db from "@/app/lib/database";
import Member from "@/app/lib/models/Member";
import Parent from "@/app/lib/models/Parent";
import Teacher from "@/app/lib/models/Teacher";
import Admin from "@/app/lib/models/Admin";
import Applicant from "@/app/lib/models/Applicant";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		// console.log("data", data);

		const { folder, userId, department } = data;

		/*
        ========================
        VALIDATE DATA PARAMETERS
        ========================
        */

		if (!folder) return NextResponse.json({ message: "cloudinary subfolder is required for upload signature." }, { status: 400 });

		if (!userId) return NextResponse.json({ message: "userId is required for upload signature." }, { status: 400 });

		if (!department) return NextResponse.json({ message: "department is required for upload signature." }, { status: 400 });

		/*
        =======================================
        1. VERIFY USER AND CLOUDINARY SUBFOLDER
        =======================================
        */

		let user;

		switch (department) {
			case "members":
				user = await Member.findById({ _id: userId });
				break;
			case "parents":
				user = await Parent.findById({ _id: userId });
				break;
			case "teachers":
				user = await Teacher.findById({ _id: userId });
				break;
			case "admin":
				user = await Admin.findById({ _id: userId });
				break;
			case "careers":
				user = await Applicant.findById({ _id: userId });
				break;
			default:
				throw new Error("Department not recognized.");
		}

		if (!user) return NextResponse.json({ message: "User not found." }, { status: 404 });

		if (user.cloudinarySubfolder !== folder) return NextResponse.json({ message: "Invalid uploading subfolder" }, { status: 400 });

		/*
		=====================================
		2. BUILD FOLDER STRUCTURE & PUBLIC ID
		=====================================
		*/

		const subfolder = user.cloudinarySubfolder;

		// console.log("subfolder", subfolder);

		const public_id = `${Date.now()}`;

		/*
		==================================
		3. GENERATE SIGNATURE
		==================================
		*/

		const signatureData = generateCloudinarySignature({
			folder: subfolder,
			public_id
		});

		// console.log("signature", signatureData);

		const results = {
			...signatureData,
			subfolder,
			public_id
		};

		// console.log("results", results);

		return NextResponse.json({ results, message: "upload signature was successful." }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}
