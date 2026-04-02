import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const academySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		phone: {
			type: String,
			trim: true,
			required: true
		},
		email: {
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
		albums: [
			{
				type: ObjectId,
				ref: "Image"
			}
		],
		administration: [
			{
				type: ObjectId,
				ref: "School_Staff"
			}
		],
		teachers: [
			{
				type: ObjectId,
				ref: "Teacher"
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.models.Academy || mongoose.model("Academy", academySchema);
