import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const memberSnapshotSchema = new Schema(
	{
		memberId: {
			type: ObjectId,
			ref: "Member",
			index: true,
			unique: true
		},
		reputationScore: {
			type: Number
		},
		level: {
			type: Number
		},
		streak: {
			type: Number
		},
		lastCalculatedAt: {
			type: Date
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Member_Snapshot || mongoose.model("Member_Snapshot", memberSnapshotSchema);
