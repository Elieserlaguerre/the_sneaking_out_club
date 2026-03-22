import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const activitySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		startDate: {
			type: Date,
			required: true
		},
		startTime: {
			type: String,
			trim: true,
			required: true
		},
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
		address1: {
			type: String,
			trim: true,
			required: true
		},
		address2: {
			type: String,
			trim: true,
			required: true
		},
		city: {
			type: String,
			trim: true,
			required: true
		},
		state: {
			type: String,
			trim: true,
			required: true
		},
		zipCode: {
			type: String,
			trim: true,
			required: true
		},
		staff: [
			{
				type: ObjectId,
				ref: "Admin"
			}
		],
		chaperone: [
			{
				type: ObjectId,
				ref: "Parent"
			}
		],
		attendees: [
			{
				type: ObjectId,
				ref: "Member"
			}
		],
		creator: {
			type: ObjectId,
			ref: "Admin"
		},
		tier: {
			type: String,
			trim: true,
			required: true,
			enum: ["tier_1", "tier_2", "tier_3", "tier_4"]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Activity || mongoose.model("Activity", activitySchema);
