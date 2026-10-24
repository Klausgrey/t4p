import { pool as db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "node:crypto";

export async function createAccount(req, res) {
	const { accountType, currency } = req.body;
	try {
		const accountNumber = crypto.randomInt(100_000, 1_000_000).toString();
		const id = uuidv4();
		const userId = req.user.id;

		const [[{ count }]] = await db.query(
			`select count(*) as count from accounts where userId = ?`,
			[userId],
		);

		if (count >= 3)
			return res
				.status(409)
				.json({ message: "you cannot create more than 3 bank accounts" });

		await db.query(
			`insert into accounts (id, userId, accountNumber, accountType, currency) values (?, ?, ?, ?, ?)`,
			[id, userId, accountNumber, accountType, currency],
		);
		res.status(201).json({
			accountNumber,
			accountType,
			currency,
			message: "Account created successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}
export async function getAccountDetails(req, res) {
	const userId = req.user.id;
	try {
		const [[account]] = await db.query(
			`select u.firstName, u.lastName, u.email, a.accountNumber, a.accountType, a.currency, a.balance from users u join accounts a on u.id = a.userId where u.id = ?`,
			[userId],
		);
		res.status(200).json({ account });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}

export async function getAccountSummary(req, res) {
	const userId = req.user.id;
	try {
		const [[account]] = await db.query(``, []);
		res.status(200).json({ account });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}
