import {
	createUser,
	getUsername,
	getCurrentUser,
	getAllUsers,
} from "../models/users.models.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const jwt = Jwt;
import "dotenv/config";

export const register = async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await createUser(username, hashedPassword);
		if (!user) return res.status(409).json({ error: "User already exists..." });
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
		const user = await getUsername(username);
		if (!user)
			return res.status(401).json({ error: "Invalid username or password..." });
		const match = await bcrypt.compare(password, user.password);
		if (!match)
			return res.status(401).json({ error: "Invalid username or password..." });

		const payload = {
			id: user.id,
			username: user.username,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
		res.status(200).json({ message: "user logged in...", token });
	} catch (err) {
		res.status(500).json({error: "there was an error"});
	}
};

export const getUsers = async (req, res) => {
	const userId = req.user.id;
	try {
		const user = await getCurrentUser(userId);
		res
			.status()
			.json({ status: "success", id: user.id, username: user.username });
	} catch (err) {
		res.status(501).json(err);
	}
};

export const getAll = async (req, res) => {
	const userId = req.user.id;
	try {
		const user = await getAllUsers();
		res.status(200).json({ status: "success", user });
	} catch (err) {
		res.status(501).json(err);
	}
};
