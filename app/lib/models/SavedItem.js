import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const savedItemSchema = new Schema(
	{
		user: {
			type: ObjectId,
			required: true,
			refPath: "userType",
			index: true
		},

		userType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},

		content: {
			type: ObjectId,
			required: true,
			refPath: "contentType"
		},

		contentType: {
			type: String,
			required: true,
			enum: ["Post"]
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Saved_Item"
		},

		location: {
			type: ObjectId,
			ref: "Saved_Collection",
			index: true,
			default: null
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Saved_Item || mongoose.model("Saved_Item", savedItemSchema);
