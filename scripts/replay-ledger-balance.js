import "dotenv/config";
import SellerBalance from "../app/lib/model/SellerBalance.js";
import TransferLedger from "../app/lib/model/TransferLedger.js";
import { getRiskThresholdForSeller } from "../app/lib/util/backend-helper-functions/ledger-handlers-layer.js";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);

export async function replayLedgerBalances() {
	console.log("Starting ledger replay...");

	// Reset seller balances
	await SellerBalance.deleteMany({});

	const ledgerEntries = await TransferLedger.find({}).sort({ createdAt: 1 }).lean();

	const balanceMap = new Map();

	for (const entry of ledgerEntries) {
		if (!entry.seller) continue;

		const key = `${entry.seller}_${entry.sellerType}_${entry.currency}`;

		if (!balanceMap.has(key)) {
			balanceMap.set(key, {
				seller: entry.seller,
				sellerType: entry.sellerType,
				currency: entry.currency,
				pendingBalanceCents: 0,
				availableBalanceCents: 0,
				reservedBalanceCents: 0,
				negativeCarryForwardCents: 0
			});
		}

		const balance = balanceMap.get(key);

		const amount = entry.direction === "credit" ? entry.amountCents : -entry.amountCents;

		if (entry.balanceBucket === "pending") {
			balance.pendingBalanceCents += amount;
		}

		if (entry.balanceBucket === "available") {
			balance.availableBalanceCents += amount;
		}

		if (entry.balanceBucket === "reserved") {
			balance.reservedBalanceCents += amount;
		}

		if (entry.balanceBucket === "negativeCarryForward") {
			balance.negativeCarryForwardCents += amount;
		}

		if (entry.balanceBucket === "platform") {
			balance.availableBalanceCents += amount;
		}
	}

	for (const balance of balanceMap.values()) {
		balance.riskThresholdCents = await getRiskThresholdForSeller(balance.seller, balance.sellerType);
	}

	await SellerBalance.insertMany(Array.from(balanceMap.values()));

	console.log("Ledger replay complete.");
}

/*
CLI
*/

if (process.argv[1].includes("replay-ledger-balance")) {
	await mongoose.connect(process.env.MONGO_URI);

	await replayLedgerBalances();

	process.exit();
}
