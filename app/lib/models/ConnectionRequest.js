import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const connectionRequestSchema = new Schema(
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

		recipient: {
			type: ObjectId,
			required: true,
			refPath: "recipientType"
		},

		recipientType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},

		status: {
			type: String,
			enum: ["pending", "accepted", "denied", "blocked"],
			default: "pending"
		},

		favored: {
			type: Boolean,
			required: true,
			default: false
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Connection_Request"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Connection_Request || mongoose.model("Connection_Request", connectionRequestSchema);
