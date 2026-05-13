import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const postSchema = new Schema(
	{
		type: {
			type: String,
			trim: true,
			required: true,
			enum: ["text", "image", "video"]
		},

		// optional text attached to any post
		caption: {
			type: String,
			trim: true,
			maxlength: 5000
		},

		// only used for image/video posts
		media: {
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

		duration: {
			type: Number // useful for videos
		},

		format: {
			type: String
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

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Post"
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

			sad: {
				type: Number,
				default: 0
			},

			angry: {
				type: Number,
				default: 0
			}
		},

		totalReactions: {
			type: Number,
			default: 0
		},

		commentCount: {
			type: Number,
			default: 0
		},

		shareCount: {
			type: Number,
			default: 0
		},

		viewCount: {
			type: Number,
			default: 0
		},

		saveCount: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

postSchema.index({ creator: 1, createdAt: -1 });

postSchema.index({ createdAt: -1 });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
