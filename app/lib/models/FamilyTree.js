import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const familyTreeSchema = new Schema(
	{
		//The family name
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true
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

		// The family's motto.
		motto: {
			type: String,
			trim: true
		},

		//The family's place of origin. Ex: Haiti, Africa, United States, etc.
		origin: {
			type: String,
			required: true
		},

		// The ancestral line the root family came from.
		lineage: [
			{
				type: ObjectId,
				ref: "Ancestor"
			}
		],

		// The original family at the top of the family tree
		rootFamily: [
			{
				member: {
					type: ObjectId,
					required: true,
					refPath: "rootFamily.memberType"
				},
				memberType: {
					type: String,
					required: true,
					enum: ["Member", "Parent", "Teacher", "Admin", "Family_Membership"]
				}
			}
		],

		// The new families created from members of the root family
		branches: [
			{
				type: ObjectId,
				ref: "Family"
			}
		],

		// generation count starting from the root family in the familyTree.
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
			type: Date,
			required: true
		},

		//FAMILY BRANDING
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

		totalFamilies: {
			type: Number,
			default: 0
		},

		totalMembers: {
			type: Number,
			default: 0
		},

		creator: {
			type: ObjectId,
			required: true,
			ref: "Parent"
		},

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Family_Tree"
		},

		slug: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Family_Tree || mongoose.model("Family_Tree", familyTreeSchema);
