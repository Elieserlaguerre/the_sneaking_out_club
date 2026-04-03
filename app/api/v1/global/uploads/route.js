import { uploadImage, uploadMultipleImages } from "@/app/lib/cloudinary/helpers";
import db from "@/app/lib/database";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();

		const data = await req.formData();
		// console.log("formData", formData);

		const upload = Object.fromEntries(data.entries());
		// console.log("upload", upload);

		const { uploadType, cloudinarySubfolder } = upload;

		if (!uploadType) return NextResponse.json({ message: "upload type is required for file upload." }, { status: 400 });

		if (!cloudinarySubfolder) return NextResponse.json({ message: "cloudinary subfolder is missing." }, { status: 404 });

		let results;

		switch (uploadType) {
			case "single":
				results = await uploadImage(upload?.image, cloudinarySubfolder);
				break;
			case "multiple":
				results = await uploadMultipleImages(upload?.images, cloudinarySubfolder);
				break;
			default:
				throw new Error("upload type not recognized.");
		}

		// console.log("upload results", results);

		return NextResponse.json({ results, message: "Image successfully uploaded." }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
