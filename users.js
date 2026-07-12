/*
  implement sorting, filters, thororugh validations
*/

const router = require("express").Router();
const { dir } = require("node:console");
const { v4 } = require("uuid");


const users = [
	{
		id: "16f5b131-8fe8-4638-8d96-1aa53501625d",
		name: "Asabe",
		email: "asabe@example.com",
		age: 13,
	},
	{
		id: "9a59b83e-c76e-4c76-a88b-70c91df36627",
		name: "Edosa",
		email: "edosa@example.com",
		age: 12,
	},
	{
		id: "53a381b7-7b0f-4969-bb5f-f3c6add2c5df",
		name: "Uche",
		email: "uche@example.com",
		age: 15,
	},
	{
		id: "40f2cb37-a452-4185-9b9f-84d61b33bf82",
		name: "Ebun",
		email: "ebun@example.com",
		age: 18,
	},
	{
		id: "f4b64879-4c8f-4554-adc2-adcbb97d01d3",
		name: "Nic",
		email: "nic@example.com",
		age: 14,
	},
	{
		id: v4(),
		name: "Random Name",
		email: "UcHe@eXaMpLe.com",
		age: 60,
	},
];

router.get("", (req, res) => {
	let filteredUsers = users;
	const { email, sortBy } = req.query;
	if (sortBy) {
		if (sortBy === "age") {
			let direction = req.query.order === "desc" ? -1 : 1;
			filteredUsers.sort((a, b) => (a.age - b.age) * direction);
		} else
			return res.status(400).json({ message: "you can only sort by age..." });
	}
	if (email) {
		filteredUsers = users.filter(
			(user) => user.email.toLowerCase() == email?.toLowerCase(),
		);
	}
	res.status(200).json({
		status: true,
		message: "Here are all the users!",
		data: {
			users: filteredUsers,
		},
	});
});

router.get("/:variable", (req, res) => {
	const params = req.params;
	const { variable: userId } = req.params;

	const user = users.find((user) => user.id == userId);
	if (!user) {
		return res.status(404).json({ message: "User not found!" });
	}

	res.status(200).json({
		data: user,
	});
});

router.post("", (req, res) => {
	const body = req.body;

	const { name, email } = req.body;

	const user = users.find((user) => user.email == email);

	if (user) {
		return res
			.status(400)
			.json({ message: `User with email: ${email} exists` });
	}

	const data = { id: v4(), name, email };

	users.push(data);

	res.status(201).json({
		message: "User created successfully",
		data,
	});
});

router.put("/:id", (req, res) => {
	const userId = req.params.id;
	const { name, email, age } = req.body;
	if (!userId || !name || !email || !age)
		return res
			.status(400)
			.json({ message: "name, email and age are all required..." });

	if (
		typeof name !== "string" ||
		typeof email !== "string" ||
		typeof age !== "number"
	)
		return res
			.status(400)
			.json({ message: "name and email must be a string " });

	const user = users.find((user) => user.id == userId);
	if (!user) return res.status(400).json({ message: "user does not exists" });
	user.name = name;
	user.email = email;
	user.age = age;

	const result = { userId, name, email, age };
	res.status(200).json({
		message: `user with the id ${userId} has been updated successfully`,
		result,
	});
});

router.delete("/:id", (req, res) => {
	let data;
	const userId = req.params.id;
	if (!userId) return res.status(400).json({ message: "provide an id..." });

	const userIndex = users.findIndex((userIndex) => userIndex.id == userId);

	if (userIndex !== -1) {
		data = users.splice(userIndex, 1);
		res.status(200).json({
			message: `user with the ${userId} has been deleted successfully`,
			data: data,
		});
	} else res.status(404).json({ message: `user with id ${userId} not found` });
});

module.exports = router;
