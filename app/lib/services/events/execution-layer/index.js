import Ledger from "@/app/lib/models/Ledger";

export const createNewLedger = async (entries = [], session) => {
	try {
		if (!Array.isArray(entries) || entries.length === 0) {
			throw new Error("createLedgerEntries requires an array of ledger entries");
		}

		if (!session) {
			throw new Error("createLedgerEntries requires a mongoose session");
		}

		await Ledger.create(entries, { session });

		return {
			success: true,
			message: "new ledger entries successfully created.",
			status: 200
		};
	} catch (error) {
		return {
			success: false,
			message: error?.message ?? "something went wrong with ledger entry write.",
			error: error,
			status: 400
		};
	}
};
