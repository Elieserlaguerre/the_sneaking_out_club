import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const commentSchema = new Schema(
	{
		post: {
			type: ObjectId,
			ref: "Post",
			require: true
		},

		parentComment: {
			type: ObjectId,
			ref: "Comment",
			default: null
		},

		message: {
			type: String,
			required: true,
			maxlength: 2000
		},

		creator: {
			type: ObjectId,
			required: true,
			refPath: "creatorType"
		},

		creatorType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},

		reactionCounts: {
			like: {
				type: Number,
				default: 0
			},

			dislike: {
				type: Number,
				default: 0
			},

			love: {
				type: Number,
				default: 0
			},

			laugh: {
				type: Number,
				default: 0
			},

			wow: {
				type: Number,
				default: 0
			},

			angry: {
				type: Number,
				default: 0
			},

			sad: {
				type: Number,
				default: 0
			}
		},

		totalReactions: {
			type: Number,
			default: 0
		},

		replyCount: {
			type: Number,
			default: 0
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Comment"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
