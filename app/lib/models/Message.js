import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const messageSchema = new Schema(
	{
		sender: {
			type: ObjectId,
			refPath: "senderType"
		},

		senderType: {
			type: String,
			enum: ["Admin", "Parent", "Member"]
		},

		recipient: {
			type: ObjectId,
			required: true,
			refPath: "recipientType"
		},

		recipientType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent", "Member"]
		},

		status: {
			type: String,
			trim: true,
			lowercase: true,
			enum: ["read", "unread"],
			default: "unread"
		},

		subject: {
			type: String,
			trim: true,
			required: true
		},

		message: {
			type: String,
			trim: true,
			required: true
		},

		messageType: {
			type: String,
			trim: true,
			lowercase: true,
			enum: ["inbox", "draft", "trash", "important"],
			required: true
		},
		parentMessage: {
			type: ObjectId,
			ref: "Message"
		},
		responses: [
			{
				type: ObjectId,
				ref: "Message"
			}
		],

		firstName: {
			type: String,
			trim: true
		},

		lastName: {
			type: String,
			trim: true
		},

		email: {
			type: String,
			trim: true
		},

		phone: {
			type: String,
			trim: true
		},

		department: {
			type: String,
			trim: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
