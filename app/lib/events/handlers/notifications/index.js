import mongoose from "mongoose";
import { processEvent } from "../event-processor";

export const handleFriendRequestNotificationEvent = async (data) => {
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

export const handleFriendRequestAcceptedEvent = async (data) => {
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

export const handleFriendRequestDeniedEvent = async (data) => {
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
