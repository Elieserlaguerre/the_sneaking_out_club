import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const groupSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		about: {
			type: String,
			trim: true,
			required: true
		},
		privacy: {
			type: String,
			trim: true,
			required: true,
			enum: ["public", "private"]
		},
		visibility: {
			type: String,
			trim: true,
			required: true,
			enum: ["visible", "hidden"]
		},
		members: {
			type: [
				{
					member: {
						type: ObjectId,
						required: true,
						refPath: "members.memberType"
					},
					memberType: {
						type: String,
						required: true,
						enum: ["Member", "Parent", "Teacher", "Admin"]
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
			default: "Group"
		},
		events: {
			type: [
				{
					type: ObjectId,
					ref: "Event"
				}
			],
			default: []
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
		managers: {
			type: [
				{
					manager: {
						type: ObjectId,
						required: true,
						refPath: "managers.managerType"
					},
					managerType: {
						type: String,
						required: true,
						enum: ["Member", "Parent", "Teacher", "Admin"]
					}
				}
			],
			default: []
		},
		feed: {
			type: ObjectId,
			ref: "Feed"
		},
		rules: {
			type: [
				{
					rule: {
						type: String,
						trim: true
					},
					description: {
						type: String,
						trim: true
					}
				}
			],
			default: []
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
