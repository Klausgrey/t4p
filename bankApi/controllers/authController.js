import { pool as db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function registerUser(req, res) {
	let { firstName, lastName, email, phoneNumber, password } = req.body;
	const id = uuidv4();

	password = await bcrypt.hash(password, 10);

	try {
		const [[result]] = await db.query(
			`select email, phoneNumber
			from users
			where email = ? or phoneNumber = ?`,
			[email, phoneNumber],
		);

		if (result) return res.status(409).json({ message: "user already exists" });

		await db.query(
			`insert into users
			(id, firstName, lastName, email, phoneNumber, password)
			values (?, ?, ?, ?, ?, ?)`,
			[id, firstName, lastName, email, phoneNumber, password],
		);

		await db.query(
			`insert into user_activity_logs
			(userId, action, ipAddress)
			values (?,?,?)`,
			[id, "register", req.ip],
		);

		res.status(201).json({ id, firstName, lastName, email, phoneNumber });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}

export async function loginUser(req, res) {
	const { email, password } = req.body;

	try {
		const [[user]] = await db.query(
			`select id, email, password, isActive from users where email = ?`,
			[email],
		);
		if (!user) return res.status(401).json({ message: "user not found" });
		if (!user.isActive)
			return res.status(403).json({ message: "user account is inactive" });

		const match = await bcrypt.compare(password, user.password);
		if (!match)
			return res.status(401).json({ message: "password is incorrect" });

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		await db.query(
			`insert into user_activity_logs
			(userId, action, ipAddress)
			values (?,?,?)`,
			[user.id, "login", req.ip],
		);

		res.status(200).json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}
