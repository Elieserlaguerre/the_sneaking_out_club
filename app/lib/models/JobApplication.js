import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const jobApplicationSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String,
			trim: true,
			required: true
		},
		details: [
			{
				title: {
					type: String,
					trim: true
				},
				detail: {
					type: String,
					trim: true
				}
			}
		],
		payRateCents: {
			type: Number,
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

		banner: {
			publicId: {
				type: String,
				trim: true
			},
			url: {
				type: String,
				trim: true
			}
		},

		creator: {
			type: ObjectId,
			ref: "Admin"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Job_Application || mongoose.model("Job_Application", jobApplicationSchema);
