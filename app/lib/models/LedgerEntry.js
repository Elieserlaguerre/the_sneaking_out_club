import mongoose from "mongoose";
import { EVENT_TYPES } from "../util/backend-helper-functions/ledger/variables";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ledgerEntrySchema = new Schema(
	{
		entity: {
			type: ObjectId,
			required: true,
			index: true
		},

		entityType: {
			type: String,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"],
			required: true
		},

		ledgerType: {
			type: String,
			enum: ["reputation", "perk"],
			required: true
		},

		eventType: {
			type: String,
			required: true,
			enum: Object.values(EVENT_TYPES)
		},

		source: {
			type: String,
			enum: ["assignment", "event", "activity", "manual", "system"],
			required: true
		},

		value: {
			type: Number,
			required: true
			// +10, -25, etc.
		},

		metadata: {
			type: Schema.Types.Mixed
			// store anything:
			// assignmentId, eventId, activityId, perkId, cardColor, value, notes, etc.
		},

		createdBy: {
			type: ObjectId,
			refPath: "createdByType"
		},

		createdByType: {
			type: String,
			enum: ["Admin", "Teacher", "Parent", "System"]
		}
	},
	{ timestamps: true }
);

ledgerEntrySchema.index({ entity: 1, createdAt: -1 });
ledgerEntrySchema.index({ entity: 1, eventType: 1, createdAt: -1 });
ledgerEntrySchema.index({ entity: 1, eventType: 1, "metadata.assignmentId": 1 }, { unique: true, sparse: true });
ledgerEntrySchema.index({ entity: 1, eventType: 1, "metadata.eventId": 1 }, { unique: true, sparse: true });
ledgerEntrySchema.index({ entity: 1, eventType: 1, "metadata.idempotencyKey": 1 }, { unique: true, sparse: true });

export default mongoose.models.Ledger_Entry || mongoose.model("Ledger_Entry", ledgerEntrySchema);
