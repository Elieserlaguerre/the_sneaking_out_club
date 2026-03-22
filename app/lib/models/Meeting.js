import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const meetingSchema = new Schema(
	{
		subject: {
			type: String,
			trim: true,
			required: true
		},
		sender: {
			type: ObjectId,
			required: true,
			refPath: "senderType"
		},
		senderType: {
			type: String,
			required: true,
			enum: ["Admin", "Parent", "Member"]
		},

		recipients: [
			{
				recipient: {
					type: ObjectId,
					required: true,
					refPath: "recipientType"
				},
				recipientType: {
					type: String,
					required: true,
					enum: ["Admin", "Parent", "Member"]
				},
				response: {
					type: String,
					trim: true,
					enum: ["accepted", "declined", "requested_reschedule"]
                },
                
                comment: {
                    type: String,
                    trim: true
                }
			}
		],

		startDate: {
			type: Date,
			required: true
		},

		startTime: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);
