import { pool as db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const createAccount = async (req, res) => {
	const { accountType, currency } = req.body;
	try {
		const accountNumber = crypto
			.randomInt(1000000001, 1000000002)
			.toString()
			.padStart(10, "0");
		const id = uuidv4();
		const userId = req.user.id;


		// how to create more than one account for a user?
		const [[result]] = await db.query(
			`select userId from accounts where userId = ?`,
			[userId],
		);

		if (result)
			return res.status(409).json({ message: "user already has an account" });

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
};

export const getAccountDetails = async (req, res) => {
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
};
