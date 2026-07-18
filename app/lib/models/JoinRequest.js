import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const joinRequestSchema = new Schema(
	{
		requester: {
			type: ObjectId,
			required: true,
			refPath: "requesterType"
		},
		requesterType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},
		entity: {
			type: ObjectId,
			required: true,
			refPath: "entityType"
		},
		entityType: {
			type: String,
			required: true,
			enum: ["Group", "Event"]
		},
		owner: {
			type: ObjectId,
			required: true,
			refPath: "ownerType"
		},
		ownerType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Join_Request"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Join_Request || mongoose.model("Join_Request", joinRequestSchema);
