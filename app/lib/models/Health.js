import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const healthSchema = new Schema(
	{
		user: {
			type: String,
			trim: true,
			required: true
		},
		status: {
			type: String,
			trim: true,
			required: true
		},
		creator: {
			type: ObjectId,
			ref: "Parent"
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Health"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Health || mongoose.model("Health", healthSchema);
