import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const programCategorySchema = new Schema(
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
		subcategories: {
			type: [
				{
					type: ObjectId,
					ref: "Program_Subcategory"
				}
			],
			default: []
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
			default: "Program_Category"
		},

		creator: {
			type: ObjectId,
			ref: "Admin"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Program_Category || mongoose.model("Program_Category", programCategorySchema);
