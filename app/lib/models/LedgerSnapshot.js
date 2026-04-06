import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ledgerSnapshotSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		eventType: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Ledger_Snapshot || mongoose.model("Ledger_Snapshot", ledgerSnapshotSchema);
