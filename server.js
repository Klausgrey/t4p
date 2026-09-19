const express = require("express");
const app = express();
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { db: dbConn } = require("./config/db");
const bcrypt = require("bcrypt");

app.use(express.json());

const PORT = process.env.PORT || 3000;

const userSchema = Joi.object({
	username: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	phone_number: Joi.string()
		.pattern(/^(0|\+?234)[7-9][01]\d{8}$/)
		.messages({
			"string.pattern.base":
				"Phone number must be a valid Nigerian phone number",
		})
		.required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/api/v1/users", async (req, res) => {
	const { username, email, password, phone_number } = req.body;
	const { error } = userSchema.validate({
		username,
		email,
		password,
		phone_number,
	});

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const id = uuidv4();

	try {
		// insert into db
		// await dbConn.query(
		//   `INSERT INTO app_users VALUES ('${id}', '${username}', '${email}', '${hashedPassword}', '${phone_number}');`
		// );

		await dbConn.query(`INSERT INTO app_users VALUES (?, ?, ?, ?, ?)`, [
			id,
			username,
			email,
			hashedPassword,
			phone_number,
		]);

		return res
			.status(201)
			.json({ id: uuidv4(), username, email, phone_number });
	} catch (err) {
		console.log("error:", err?.message ?? err);
		return res.status(500).json({
			message: "Error processing request",
		});
	}
});

app.get("/api/v1/users", async (req, res) => {
	try {
		const [result] = await dbConn.query("SELECT * FROM tech4pride.app_users");

		const users = result.map((user) => {
			delete user.password;
			return user;
		});

		return res.json({
			message: "Users retrieved successfully...",
			users,
		});
	} catch (err) {
		console.log("error:", err?.message ?? err);
		return res.status(500).json({
			message: "Error processing request",
		});
	}
});

app.post("/api/v1/auth/login", (req, res) => {
	const { email, password } = req.body;
	const { error } = loginSchema.validate({ email, password });

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	// Process the login data (e.g., verify credentials)
	res.status(200).json({ message: "Login successful" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
