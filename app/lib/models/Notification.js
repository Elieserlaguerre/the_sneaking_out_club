import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const notificationSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true
		},

		event: {
			type: String,
			trim: true,
			required: true
		},

		message: {
			type: String,
			trim: true,
			required: true
		},

		from: {
			type: ObjectId,
			required: true,
			refPath: "senderType"
		},

		senderType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"]
		},

		to: {
			type: ObjectId,
			required: true,
			refPath: "recipientType"
		},

		recipientType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
