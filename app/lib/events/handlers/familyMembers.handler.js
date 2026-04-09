import mongoose from "mongoose";
import { buildNewFamilyMemberEntries } from "../../services/events/builder-layer";
import { eventSchema } from "../../util/global-helper-functions/zod-validations";
import { fromZodError } from "zod-validation-error";

/*
======================================================
RULE: ALL FUNCTIONS IN THIS FILE MUST END WITH "EVENT"
======================================================
*/

export const handleNewFamilyMemberEvent = async (data) => {
	const session = await mongoose.startSession();

	const validation = eventSchema.safeParse(data);

	try {
		if (validation.success) {
			const entries = await buildNewFamilyMemberEntries(data);
			console.log("event triggered", entries);
		} else {
			const errors = fromZodError(validation.error);
			throw new Error(errors);
		}
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
	} finally {
		await session.endSession();
	}
};

export const handleUpdateFamilyTreeEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		//business logic
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
	} finally {
		await session.endSession();
	}
};

export const handleFamilyMemberRemovalEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		// business logic
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};

export const handleUserProfileUpdateEvent = async (data) => {
	const session = await mongoose.startSession();

	try {
		//business logic
	} catch (error) {
		console.log("🚨 EVENT ERROR:", error);
		throw new Error(error);
	} finally {
		await session.endSession();
	}
};
