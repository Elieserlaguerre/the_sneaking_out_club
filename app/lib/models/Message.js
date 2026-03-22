import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const messageSchema = new Schema(
	{
		subject: {
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

		content: {
			type: String,
			trim: true,
			required: true
		},
		status: {
			type: String,
			trim: true,
			lowercase: true,
			enum: ["read", "unread"]
		},
		messageType: {
			type: String,
			trim: true,
			lowercase: true,
			enum: ["inbox", "draft", "trash", "important"]
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
		]
	},
	{ timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
