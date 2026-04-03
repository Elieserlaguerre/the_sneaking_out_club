import cloudinary from "..";
import { Readable } from "stream";
import crypto from "crypto";

export const uploadImage = async (file, subfolder) => {
	if (!file || file.size === 0) {
		throw new Error("Image file is empty.");
	}

	if (!subfolder) {
		throw new Error("Cloudinary subfolder is required.");
	}

	const buffer = Buffer.from(await file.arrayBuffer());

	const cloudinaryOptions = {
		folder: `${process.env.CLOUD_NAME}/${subfolder}`,
		use_filename: true,
		use_asset_folder_as_public_id: true,
		resource_type: "auto",
		overwrite: true,
		invalidate: true
	};

	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(cloudinaryOptions, (error, result) => {
			if (error) return reject(error);

			resolve({
				publicId: result.public_id,
				url: result.secure_url,
				width: result.width,
				height: result.height
			});
		});

		Readable.from(buffer).pipe(stream);
	});
};

export const uploadMultipleImages = async (files, subfolder) => {
	if (!files?.length) {
		throw new Error("Image files are missing.");
	}

	const uploads = files.map((file) => uploadImage(file, subfolder));

	return await Promise.all(uploads);
};

export const deleteImage = async (publicId) => {
	if (!publicId) throw new Error("Public ID is required.");

	try {
		const result = await cloudinary.uploader.destroy(publicId, {
			invalidate: true
		});

		return { success: result.result === "ok" };
	} catch (error) {
		throw new Error(`Delete image failed: ${error.message}`);
	}
};

export const deleteMultipleImages = async (publicIds) => {
	if (!publicIds?.length) {
		throw new Error("Public IDs are required.");
	}

	try {
		const result = await cloudinary.api.delete_resources(publicIds);

		return {
			success: true,
			deleted: result.deleted
		};
	} catch (error) {
		throw new Error(`Delete multiple images failed: ${error.message}`);
	}
};

export const deleteSubfolder = async (subfolder) => {
	if (!subfolder) throw new Error("Subfolder required");

	try {
		const deleteUploads = await cloudinary.api.delete_resources_by_prefix(`${process.env.CLOUD_NAME}/${subfolder}`);

		const deletedFolder = await cloudinary.api.delete_folder(`${process.env.CLOUD_NAME}/${subfolder}`);

		return {
			success: true,
			totalDeletedUploads: deleteUploads?.deleted_counts,
			deletedFolder: deletedFolder?.deleted
		};
	} catch (error) {
		throw new Error("Folder deletion failed:", error.message);
	}
};

export const deleteMultipleSubfolders = async (subfolders) => {
	if (!subfolders?.length) {
		throw new Error("Subfolders are required.");
	}

	const results = await Promise.allSettled(subfolders.map((folder) => deleteSubfolder(folder)));

	return results;
};

export function generateCloudinarySignature({ folder, public_id }) {
	const timestamp = Math.round(Date.now() / 1000);

	const paramsToSign = `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

	const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

	return {
		timestamp,
		signature,
		apiKey: process.env.CLOUDINARY_API_KEY,
		cloudName: process.env.CLOUD_NAME
	};
}
