import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reportCardSchema = new Schema(
	{
		student: {
			type: ObjectId,
			required: true,
			refPath: "studentType"
		},
		studentType: {
			type: String,
			required: true,
			enum: ["Member", "Admin", "Parent"]
		},

		grades: [
			{
				class: {
					type: String,
					trim: true,
					lowercase: true,
					required: true
				},
				semester: {
					type: String,
					trim: true,
					uppercase: true,
					required: true,
					enum: ["1Q", "2Q", "3Q", "4Q"]
				},
				grade: {
					type: String,
					trim: true,
					uppercase: true,
					required: true,
					enum: ["A", "B", "C", "D", "F"]
				},
				teacher: {
					type: ObjectId,
					ref: "School_Staff"
				}
			}
		],

		proof: [
			{
				type: ObjectId,
				ref: "Image"
			}
		],

		SchoolYear: {
			type: String,
			trim: true,
			required: true
		},

		school: {
			type: ObjectId,
			required: true,
			refPath: "schoolType"
		},

		schoolType: {
			type: String,
			required: true,
			enum: ["School", "Academy"]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Report_Card || mongoose.model("Report_Card", reportCardSchema);
