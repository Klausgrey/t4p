import { v4 } from "uuid";
// import { createUser } from "../models/users.models.js";
import bcrypt from "bcrypt";
// import { pkg } from "jsonwebtoken";
import express from "express";

const app = express();
app.use(express.json());
// const { sign } = pkg;

const users = [];

export const createUser = (username, password) => {
	const existing = users.find((user) => username == user.username);
	if (existing) return `user already exists...`;
	const data = {
		id: v4(),
		username,
		password,
		createdAt: new Date(),
	};
	users.push(data);
	return data;
};

app.post("/auth/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const data = createUser(username, hashedPassword);
		res.status(201).json({ data });
	} catch (err) {
		res.status(500).json(err);
	}
});

app.listen(3000, () => console.log("server running..."));
