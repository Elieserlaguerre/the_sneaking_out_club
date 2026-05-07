import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const searchQuerySchema = new Schema(
	{
		query: {
			type: String,
			trim: true,
			required: true
		},
		section: {
			type: String,
			trim: true,
			required: true
		},
		user: {
			type: String,
			trim: true,
			required: true
		},
		userType: {
			type: String,
			trim: true,
			required: true
		},
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Search_Query"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Search_Query || mongoose.model("Search_Query", searchQuerySchema);
