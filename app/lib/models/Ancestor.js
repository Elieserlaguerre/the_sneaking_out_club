import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ancestorSchema = new Schema(
	{
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
		dateOfBirth: {
			type: Date
		},
		age: {
			type: Number
		},
		died: {
			type: Date
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
			default: "Ancestor"
		},
		creator: {
			type: ObjectId,
			ref: "Parent"
		},

		familyTree: {
			type: ObjectId,
			ref: "Family_Tree"
		},

		family: {
			type: ObjectId,
			ref: "Family"
		},

		healthStatus: {
			type: String,
			trim: true,
			required: true,
			enum: ["healthy", "sick", "recovering", "dead"],
			default: "dead"
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

export default mongoose.models.Ancestor || mongoose.model("Ancestor", ancestorSchema);
