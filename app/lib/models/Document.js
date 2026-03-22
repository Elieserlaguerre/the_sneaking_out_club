import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const documentSchema = new Schema(
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
		docType: {
			type: String,
			trim: true,
			required: true,
			enum: ["file", "image", "video"]
		},
		content: [
			{
				type: ObjectId,
				ref: "Image"
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.models.Document || mongoose.model("Document", documentSchema);
