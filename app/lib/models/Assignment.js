import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const assignmentSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		dueDate: {
			type: Date,
			required: true
		},
		sender: {
			type: ObjectId,
			required: true,
			refPath: "senderType"
		},
		senderType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent"]
		},
		recipient: {
			type: ObjectId,
			required: true,
			refPath: "recipientType"
		},
		recipientType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent"]
		},
		status: {
			type: String,
			trim: true,
			required: true,
			enum: ["pending", "started", "action_required", "complete"]
		},
		comments: [
			{
				comment: {
					type: String,
					trim: true
				},
				sender: {
					type: ObjectId,
					required: true,
					refPath: "senderType"
				},
				senderType: {
					type: String,
					required: true,
					enum: ["Admin", "Parent", "Member"]
				}
			}
		],

		reviews: {
			ratingAverage: {
				type: Number,
				default: 0
			},
			totalCount: {
				type: Number,
				default: 0
			},
			totalSum: {
				type: Number,
				default: 0
			},
			breakDown: [
				{
					rating: {
						type: Number,
						default: 5
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 4
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 3
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 2
					},
					count: {
						type: Number,
						default: 0
					}
				},
				{
					rating: {
						type: Number,
						default: 1
					},
					count: {
						type: Number,
						default: 0
					}
				}
			],
			featuredComments: [
				{
					type: ObjectId,
					ref: "Review"
				}
			]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);
