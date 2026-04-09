import mongoose from "mongoose";
import { EVENTS } from "../events/events";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ledgerSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			lowercase: true
		},

		eventType: {
			type: String,
			required: true,
			enum: Object.values(EVENTS)
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

		user: {
			type: ObjectId,
			refPath: "userType"
		},

		userType: {
			type: String,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant"]
		},

		source: {
			type: ObjectId,
			required: true,
			refPath: "sourceType"
		},

		sourceType: {
			type: String,
			required: true,
			enum: ["Member", "Parent", "Teacher", "Admin", "Applicant", "System"]
		}
	},
	{ timestamps: true }
);

ledgerSchema.index({ entity: 1, createdAt: -1 });
ledgerSchema.index({ entity: 1, eventType: 1, createdAt: -1 });
ledgerSchema.index({ entity: 1, eventType: 1, "metadata.assignmentId": 1 }, { unique: true, sparse: true });
ledgerSchema.index({ entity: 1, eventType: 1, "metadata.eventId": 1 }, { unique: true, sparse: true });
ledgerSchema.index({ entity: 1, eventType: 1, "metadata.idempotencyKey": 1 }, { unique: true, sparse: true });

export default mongoose.models.Ledger || mongoose.model("Ledger", ledgerSchema);
