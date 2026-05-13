import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const shareSchema = new Schema(
	{
		post: {
			type: ObjectId,
			required: true
		},
		user: {
			type: ObjectId,
			required: true
		},
		userType: {
			type: String
		},
		target: {
			type: ObjectId,
			refPath: "targetType"
		},
		targetType: {
			type: String // feed, message, external
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Share"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Share || mongoose.model("Share", shareSchema);
