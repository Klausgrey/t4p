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

		await db.query(
			`insert into accounts (id, userId, accountNumber, accountType, currency) values (?, ?, ?, ?, ?)`,
			[id, userId, accountNumber, accountType, currency],
		);
		res.status(201).json({ message: "Account created successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
};
