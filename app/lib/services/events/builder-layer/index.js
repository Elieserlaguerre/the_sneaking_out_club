/*
=================================================================
RULE: ALL FILE NAMES IN THE BUILDER-LAYER MUST START WITH "BUILD"
=================================================================
*/

export const buildNewLedgerEntries = async (data) => {
	console.log("Event: build entry function", data);

	const entries = [];

	if (data.ledgerEntry.create === true && data.ledgerEntry.type === "single") {
		const entry = {
			name: data.metaData.ledgerName,
			eventType: data.eventType,
			metaData: data.metaData,
			source: data.metaData.source,
			sourceType: data.metaData.sourceType
		};

		entries.push(entry);
	}

	if (data.ledgerEntry.create === true && data.ledgerEntry.type === "double") {
	}

	return entries;
};


