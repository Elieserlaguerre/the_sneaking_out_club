import "dotenv/config";
import db from "../app/lib/dataBase/db.js";
import LedgerAccounts from "../app/lib/model/LedgerAccount.js";

const accounts = [
	{
		code: "stripe_cash",
		name: "Stripe Cash",
		type: "asset",
		direction: "debit",
		scope: "platform"
	},
	{
		code: "bank_settlement",
		name: "Bank Settlement",
		type: "asset",
		direction: "debit",
		scope: "platform"
	},
	{
		code: "customer_clearing",
		name: "Customer Clearing",
		type: "liability",
		direction: "credit",
		scope: "platform"
	},
	{
		code: "seller_payable_pending",
		name: "Seller Payable Pending",
		type: "liability",
		direction: "credit",
		scope: "platform"
	},
	{
		code: "seller_payable_available",
		name: "Seller Payable Available",
		type: "liability",
		direction: "credit",
		scope: "platform"
	},
	{
		code: "seller_reserve",
		name: "Seller Reserve",
		type: "liability",
		direction: "credit",
		scope: "platform"
	},
	{
		code: "negative_carry_forward",
		name: "Negative Carry Forward",
		type: "asset",
		direction: "credit",
		scope: "platform"
	},
	{
		code: "platform_commission",
		name: "Platform Commission Revenue",
		type: "revenue",
		direction: "credit",
		scope: "platform"
	},
	{
		code: "stripe_processing_fees",
		name: "Stripe Processing Fees",
		type: "expense",
		direction: "debit",
		scope: "platform"
	},
	{
		code: "platform_expense",
		name: "Platform Expense",
		type: "expense",
		direction: "debit",
		scope: "platform"
	}
];

export async function seedLedgerAccounts() {
	await db.connect();

	let created = 0;
	let existing = 0;

	for (const account of accounts) {
		const result = await LedgerAccounts.updateOne(
			{ code: account.code },
			{
				$setOnInsert: {
					...account,
					currency: "USD",
					isSystemAccount: true,
					active: true,
					precision: 2
				}
			},
			{ upsert: true }
		);

		if (result.upsertedCount) {
			created++;
		} else {
			existing++;
		}
	}

	return {
		success: true,
		created,
		existing
	};
}

/*
==========
CLI RUNNER
==========
*/

if (process.argv[1].includes("seed-ledger-accounts")) {
	seedLedgerAccounts()
		.then((res) => {
			console.log("Ledger accounts seeded:", res);
			process.exit(0);
		})
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}
