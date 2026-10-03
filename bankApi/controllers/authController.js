import { pool as db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
	let { firstName, lastName, email, phoneNumber, password } = req.body;
	const id = uuidv4();

	password = await bcrypt.hash(password, 10);

	try {
		const existingUser = await db.query(
			`select * from users where email = ? and phoneNumber = ?`,
			[email, phoneNumber],
		);
		if (existingUser)
			return res.status(409).json({ message: "user already exists" });

		await db.query(
			`insert into users (id, firstName, lastName, email, phoneNumber, password) values (?, ?, ?, ?, ?, ?)`,
			[id, firstName, lastName, email, phoneNumber, password],
		);

		res.status(201).json({ id, firstName, lastName, email, phoneNumber });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}
