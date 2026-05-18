import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reactionSchema = new Schema(
	{
		post: {
			type: ObjectId,
			ref: "Post"
		},

		comment: {
			type: ObjectId,
			ref: "Comment",
			default: null
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

/*
====================
POST REACTIONS
====================
One reaction per user per post
====================
*/

reactionSchema.index(
	{ post: 1, user: 1 },
	{
		unique: true,
		partialFilterExpression: {
			post: { $exists: true, $ne: null }
		}
	}
);

/*
====================
COMMENT REACTIONS
====================
One reaction per user per comment
====================
*/

reactionSchema.index(
	{ comment: 1, user: 1 },
	{
		unique: true,
		partialFilterExpression: {
			comment: { $exists: true, $ne: null }
		}
	}
);

export default mongoose.models.Reaction || mongoose.model("Reaction", reactionSchema);
