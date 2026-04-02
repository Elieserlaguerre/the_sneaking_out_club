import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const teacherSchema = new Schema(
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
		country: {
			type: String,
			trim: true,
			required: true
		},
		cloudinarySubfolder: {
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
		status: {
			type: String,
			trim: true,
			required: true,
			enum: ["active", "probation", "suspended", "expelled"],
			default: "active"
		},
		dateOfBirth: {
			type: Date
		},
		age: {
			type: Number
		},
		nationality: {
			type: String,
			trim: true
		},
		gender: {
			type: String,
			trim: true
		},
		introduction: {
			type: String,
			trim: true
		},
		online: {
			type: Boolean,
			required: true,
			default: false
		},
		subjects: [
			{
				type: String,
				trim: true
			}
		],

		hourlyRate: {
			type: Number
		},

		availability: [
			{
				day: {
					type: String,
					trim: true
				},
				startTime: {
					type: String,
					trim: true
				},
				endTime: {
					type: String,
					trim: true
				}
			}
		],

		earnings: {
			total: {
				type: Number,
				default: 0
			}
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
