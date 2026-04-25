import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const familyMembershipSchema = new Schema(
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
			trim: true,
			required: true
		},
		phone: {
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
			default: "Family_Membership"
		},
		healthStatus: {
			type: String,
			trim: true,
			required: true,
			enum: ["healthy", "sick", "recovering", "dead"],
			default: "healthy"
		},
		creator: {
			type: ObjectId,
			ref: "Parent"
		},
		familyTreeConnected: {
			type: Boolean,
			required: true,
			default: false
		},

		ConnectedHousehold: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Family_Membership || mongoose.model("Family_Membership", familyMembershipSchema);
