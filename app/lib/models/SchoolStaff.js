import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const schoolStaffSchema = new Schema(
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
		role: {
			type: String,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			required: true
		},
		phone: {
			type: String,
			trim: true,
			required: true
		},
		password: {
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

		school: {
			type: ObjectId,
			ref: "School"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.School_Staff || mongoose.model("School_Staff", schoolStaffSchema);
