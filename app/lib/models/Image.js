import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const imageSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String,
			trim: true,
			required: true
		},
		owner: {
			type: ObjectId,
			required: true,
			refPath: "ownerType"
		},
		ownerType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent", "Member"]
		},
		details: {
			publicId: {
				type: String,
				trim: true
			},
			url: {
				type: String,
				trim: true
			},
			width: {
				type: Number
			},
			height: {
				type: Number
			}
		},
		album: {
			type: ObjectId,
			ref: "Album",
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
