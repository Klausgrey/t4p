import { createUser } from "../models/users.models.js";
import bcrypt from "bcrypt";
// import { pkg } from "jsonwebtoken";
// const { sign } = pkg;

export const create = async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const data = createUser(username, hashedPassword);
		res.status(201).json({ data });
	} catch (err) {
		res.status(500).json(err);
	}
};
