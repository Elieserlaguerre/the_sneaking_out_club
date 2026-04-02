import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const perkSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},

		colorCard: {
			type: Boolean,
			required: true
		},

		cardColor: {
			type: String,
			trim: true,
			enum: ["White", "Blue", "Red"]
		},

		cardValue: {
			type: Number,
			required: true,
			default: 0
		},

		description: [
			{
				title: {
					type: String,
					trim: true,
					lowercase: true
				},
				details: {
					type: String,
					trim: true,
					lowercase: true
				}
			}
		],

		image: {
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

		qualifiedStatuses: {
			active: {
				type: Boolean,
				required: true
			},
			probation: {
				type: Boolean,
				required: true
			},
			suspended: {
				type: Boolean,
				required: true
			},
			expelled: {
				type: Boolean,
				required: true
			}
		},

		creator: {
			type: ObjectId,
			ref: "Admin"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Perk || mongoose.model("Perk", perkSchema);
