import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const collectionSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		owner: {
			type: ObjectId,
			required: true,
			refPath: "ownerType"
		},
		ownerType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin"]
		},
		contents: {
			type: [
				{
					content: {
						type: ObjectId,
						required: true,
						refPath: "contentType"
					},
					contentType: {
						type: String,
						required: true,
						enum: ["Post"]
					}
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
			default: "Saved_Collection"
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Saved_Collection || mongoose.model("Saved_Collection", collectionSchema);
