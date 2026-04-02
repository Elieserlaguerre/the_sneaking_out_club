import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const emailSubscriptionSchema = new Schema(
	{
		email: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Email_Subscription || mongoose.model("Email_Subscription", emailSubscriptionSchema);
