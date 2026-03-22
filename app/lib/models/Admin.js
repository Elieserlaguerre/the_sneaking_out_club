import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const adminSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			trim: true,
			required: true
		},
		password: {
			type: String,
			trim: true,
			required: true
		},
		phone: {
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
			}
		},
		clubStatus: {
			type: String,
			trim: true,
			required: true,
			enum: ["active", "probation", "suspended", "expelled"],
			default: "active"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
