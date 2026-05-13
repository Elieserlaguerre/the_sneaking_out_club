import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const connectionSchema = new Schema(
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
			default: "Connection"
		}
	},
	{ timestamps: true }
);

connectionSchema.index({ requester: 1, recipient: 1 });

export default mongoose.models.Connection || mongoose.model("Connection", connectionSchema);
