import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reportSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		content: {
			type: String,
			trim: true,
			required: true
		},
		user: {
			type: ObjectId,
			required: true,
			refPath: "userType"
		},
		userType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
