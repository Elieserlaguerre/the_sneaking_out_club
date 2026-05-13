import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const programSubcategorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		slug: {
			type: String,
			trim: true,
			required: true
		},
		status: {
			type: String,
			trim: true,
			required: true
		},
		parentCategory: {
			type: ObjectId,
			ref: "Program_Category"
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
		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Program_Subcategory"
		},
		creator: {
			type: ObjectId,
			ref: "Admin"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Program_Subcategory || mongoose.model("Program_Subcategory", programSubcategorySchema);
