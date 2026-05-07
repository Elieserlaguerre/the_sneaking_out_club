import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const familyMemberSchema = new Schema(
	{
		familyTree: {
			type: ObjectId,
			required: true,
			ref: "Family_Tree"
		},

		family: {
			type: ObjectId,
			ref: "Family"
		},

		firstName: {
			type: String,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			trim: true
		},
		phone: {
			type: String,
			trim: true
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
			Height: {
				type: Number
			}
		},

		dateOfBirth: {
			type: Date
		},
		age: {
			type: Number
		},
		nationality: {
			type: String,
			trim: true
		},
		gender: {
			type: String,
			trim: true
		},
		relation: [
			{
				member: {
					type: ObjectId,
					required: true,
					refPath: "memberType"
				},
				memberType: {
					type: String,
					required: true,
					enum: ["Member", "Parent", "Teacher", "Admin"]
				},
				role: {
					type: String,
					trim: true,
					required: true
				}
			}
		],

		docType: {
			type: String,
			trim: true,
			required: true,
			default: "Family_Member"
		},

		health: {
			type: ObjectId,
			ref: "Health"
		},

		creator: {
			type: ObjectId,
			required: true,
			refPath: "creatorType"
		},

		creatorType: {
			type: String,
			required: true,
			enum: ["Parent", "Admin"]
		},

		type: {
			type: String,
			trim: true,
			required: true,
			enum: ["ancestor", "root family member", "household member"]
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Family_Member || mongoose.model("Family_Member", familyMemberSchema);
