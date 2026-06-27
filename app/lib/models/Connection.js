import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const connectionSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			trim: true,
			required: true
		},
		details: {
			type: ObjectId,
			required: true,
			refPath: "detailType"
		},
		detailType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},
		image: {
			publicId: {
				type: String,
				trim: true
			},
			url: {
				type: String,
				trim: true
			},
			width: {
				type: Number
			},
			height: {
				type: Number
			}
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

export default mongoose.models.Connection || mongoose.model("Connection", connectionSchema);
