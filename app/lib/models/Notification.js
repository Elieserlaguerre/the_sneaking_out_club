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

		sender: {
			type: ObjectId,
			required: true,
			refPath: "senderType"
		},

		senderType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"]
		},

		recipient: {
			type: ObjectId,
			required: true,
			refPath: "recipientType"
		},

		recipientType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"]
		},
		docType: {
			type: String,
			required: true,
			default: "Notification"
		},

		metaData: {
			type: Schema.Types.Mixed
		},

		status: {
			type: String,
			trim: true,
			enum: ["seen", "unseen"],
			default: "unseen"
		},
		creator: {
			type: ObjectId,
			required: true,
			refPath: "creatorType"
		},
		creatorType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"]
		},
		key: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
