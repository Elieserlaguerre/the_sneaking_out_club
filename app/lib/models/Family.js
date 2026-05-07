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

		motto: {
			type: String,
			trim: true
		},

		familyTree: {
			type: ObjectId,
			ref: "Family_Tree",
			required: true
		},

		// The parent family of a child family branch
		parentFamily: {
			type: ObjectId,
			ref: "Family"
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

		familyHead: {
			type: ObjectId,
			refPath: "familyHeadType"
		},
		
		familyHeadType: {
			type: String,
			enum: ["Member", "Parent", "Teacher", "Admin", "Family_Member"]
		},

		spouse: {
			type: ObjectId,
			refPath: "spouseType"
		},

		spouseType: {
			type: String,
			enum: ["Member", "Parent", "Teacher", "Admin", "Family_Member"]
		},

		founder: {
			type: ObjectId,
			refPath: "founderType"
		},

		founderType: {
			type: String,
			enum: ["Member", "Parent", "Teacher", "Admin", "Family_Member"]
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
