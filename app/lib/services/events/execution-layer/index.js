export function validateLedgerGroup(entries) {
	if (!Array.isArray(entries) || entries.length === 0) {
		throw new Error("Ledger group validation requires entries.");
	}

	const groupIds = new Set();

	for (const entry of entries) {
		if (!entry.entryGroupId) {
			throw new Error("Ledger entry missing entryGroupId.");
		}

		groupIds.add(entry.entryGroupId);

		if (entry.direction === "debit") {
			debitTotal += entry.amountCents;
		}

		if (entry.direction === "credit") {
			creditTotal += entry.amountCents;
		}
	}

	// Ensure all entries belong to the same group
	if (groupIds.size !== 1) {
		throw new Error(`Ledger validation failed: entries contain multiple entryGroupIds: ${[...groupIds].join(", ")}`);
	}

	if (debitTotal !== creditTotal) {
		throw new Error(`Ledger group imbalance detected. Debits: ${debitTotal} Credits: ${creditTotal}`);
	}

	return true;
}

export const createNewLedger = (entries = [], session) => {
	if (!Array.isArray(entries) || entries.length === 0) {
		throw new Error("createLedgerEntries requires an array of ledger entries");
	}

	if (!session) {
		throw new Error("createLedgerEntries requires a mongoose session");
	}

	// validateLedgerGroup(entries);
};
