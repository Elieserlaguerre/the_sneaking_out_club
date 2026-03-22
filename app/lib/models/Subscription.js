import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const subscriptionSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		priceCents: {
			type: String,
			trim: true,
			required: true
		},
		creator: {
			type: ObjectId,
			ref: "Admin"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
