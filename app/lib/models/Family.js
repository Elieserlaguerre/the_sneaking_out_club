import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const familySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},

		familyTree: {
			type: ObjectId,
			ref: "Family_Tree",
			required: true
		},

		// The family you came from
		parentFamily: {
			type: ObjectId,
			ref: "Family",
			default: null
		},

		members: [
			{
				member: {
					type: ObjectId,
					required: true,
					refPath: "memberType"
				},
				memberType: {
					type: String,
					required: true,
					enum: ["Member", "Parent", "Teacher", "Admin", "Family_Member"]
				}
			}
		],

		// the families your children form when they're of age.
		childFamilies: [
			{
				type: ObjectId,
				ref: "Family"
			}
		],

		// generation count starting from the root family in familyTree.
		generationLevel: {
			type: Number,
			default: 0
		},

		// FAMILY IDENTITY
		familyHead: {
			type: ObjectId,
			ref: "Parent"
		},

		spouse: {
			type: ObjectId,
			ref: "Parent"
		},

		founder: {
			type: ObjectId,
			ref: "Parent"
		},

		established: {
			type: Date
		},

		// BRANDING
		crest: {
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

		motto: {
			type: String,
			trim: true
		},

		origin: {
			type: String
		},

		// META
		isActive: {
			type: Boolean,
			default: true
		},

		membersCount: {
			type: Number,
			default: 0
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Family"
		},

		creator: {
			type: ObjectId,
			ref: "Parent"
		},

		slug: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

familySchema.index({ name: 1, familyTree: 1 }, { unique: true });

export default mongoose.models.Family || mongoose.model("Family", familySchema);
