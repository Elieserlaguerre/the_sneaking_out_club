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

		sender: {
			type: ObjectId,
			required: true,
			refPath: "senderType"
		},

		senderType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent", "Member"]
		},

		receiver: {
			type: ObjectId,
			required: true,
			refPath: "receiverType"
		},

		receiverType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent", "Member"]
		},

		message: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
