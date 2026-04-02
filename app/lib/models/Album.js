import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const albumSchema = new Schema(
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
			enum: ["Admin", "Parent", "Member", "Teacher", "Applicant"]
		},
		coverImage: {
			publicId: {
				type: String,
				trim: true
			},
			url: {
				type: String,
				trim: true
			}
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Album || mongoose.model("Album", albumSchema);
