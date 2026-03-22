import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const policySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		content: {
			type: Array
		},
		creator: {
			type: ObjectId,
			ref: "Admin"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Policy || mongoose.model("Policy", policySchema);
