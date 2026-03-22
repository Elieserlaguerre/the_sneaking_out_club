import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const schoolSchema = new Schema(
	{
		name: {
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

		principal: {
			type: ObjectId,
			ref: "School_Staff"
		},

		images: [
			{
				type: ObjectId,
				ref: "Image"
			}
		],

		banner: {
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
        
        
	},
	{ timestamps: true }
);

export default mongoose.models.School || mongoose.model("School", schoolSchema);
