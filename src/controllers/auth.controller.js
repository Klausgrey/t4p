import { createUser, getUserPassword } from "../models/users.models.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const jwt = Jwt;
import "dotenv/config";

export const register = async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = createUser(username, hashedPassword);
		if (!user) return res.status(400).json({ error: "User already exists..." });
		res.status(201).json({
			message: "user created successfully...",
			id: user.id,
			username: user.username,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

export const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = getUserPassword(username);
		if (!user) res.status(401).json({ error: "Invalid username or password..." });
		const match = await bcrypt.compare(password, user.password);
		if (!match) res.status(401).json({ error: "Invalid username or password..." });

		const payload = {
			id: user.id,
			username: user.username,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
		res.status(200).json({ message: "user logged in...", token });
	} catch (err) {
		res.status(501).json(err);
	}
};
