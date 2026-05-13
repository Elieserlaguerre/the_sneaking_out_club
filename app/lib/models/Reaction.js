import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reactionSchema = new Schema(
	{
		post: {
			type: ObjectId,
			required: true,
			ref: "Post"
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
		},

		type: {
			type: String,
			required: true,
			enum: ["like", "dislike", "love", "laugh", "wow", "angry", "sad"]
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Reaction"
		}
	},
	{ timestamps: true }
);

reactionSchema.index({ post: 1, user: 1 }, { unique: true });

export default mongoose.models.Reaction || mongoose.model("Reaction", reactionSchema);
