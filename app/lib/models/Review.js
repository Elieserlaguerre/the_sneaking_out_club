import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reviewSchema = new Schema(
	{
		author: {
			type: ObjectId,
			required: true,
			refPath: "authorType"
		},
		authorType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent", "Member"]
		},
		rating: {
			type: Number,
			required: true,
			default: 0
		},
		comment: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
