import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const feedSchema = new Schema(
	{
		name: {
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
			enum: ["Member", "Parent", "Teacher", "Admin", "Group"]
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Feed"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Feed || mongoose.model("Feed", feedSchema);
