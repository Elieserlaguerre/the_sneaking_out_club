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
			enum: Object.values(EVENTS).map((e) => e.event)
		},

		value: {
			type: Number,
			required: true,
			default: 0
			// +10, -25, etc.
		},

		metadata: {
			type: Schema.Types.Mixed
			// store anything from family events, assignments, club events, activities, perks, cardColor, value, notes, user data, etc.
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

ledgerSchema.index({ name: 1, createdAt: -1 });
ledgerSchema.index({ name: 1, eventType: 1, createdAt: -1 });
ledgerSchema.index({ name: 1, eventType: 1, "metadata.assignmentId": 1 }, { unique: true, partialFilterExpression: { "metadata.assignmentId": { $exists: true, $ne: null } } });
ledgerSchema.index({ name: 1, eventType: 1, "metadata.eventId": 1 }, { unique: true, sparse: true });
ledgerSchema.index({ name: 1, eventType: 1, "metadata.idempotencyKey": 1 }, { unique: true, sparse: true });

export default mongoose.models.Ledger || mongoose.model("Ledger", ledgerSchema);
