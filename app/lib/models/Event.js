import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const eventSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		status: {
			type: String,
			trim: true,
			required: true
		},
		location: {
			type: String,
			trim: true,
			required: true
		},
		images: [
			{
				publicId: {
					type: String,
					trim: true
				},
				url: {
					type: String,
					trim: true
				}
			}
		],
		tier: {
			type: Number,
			required: true,
			enum: [1, 2, 3, 4]
		},
		type: {
			type: String,
			enum: ["standard", "local", "non-local", "sponsored"]
		},

		startDate: Date,
		endDate: Date,

		capacity: Number,

		participants: [
			{
				type: ObjectId,
				ref: "Member"
			}
		],

		permittedStatus: {
			type: String,
			enum: ["active", "probation"]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
