import mongoose from "mongoose";
import { processEvent } from "../event-processor";

export const handleNotificationEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		await processEvent(data, session);
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};
