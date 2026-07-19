import { v4 } from "uuid";
import fs from "fs/promises";

const readUserFromFile = async () => {
	try {
		const fileData = await fs.readFile("users.json", "utf8");
		return JSON.parse(fileData);
	} catch (err) {
		return [];
	}
};
const saveUserToFile = async (users) => {
	const stringData = JSON.stringify(users, null, 4);
	await fs.writeFile("users.json", stringData, "utf8");
};

export const createUser = async (username, password) => {
	const users = await readUserFromFile();
	const existing = users.find(
		(user) => username.toLowerCase() === user.username.toLowerCase(),
	);
	if (existing) return;
	const data = {
		id: v4(),
		username,
		password,
		createdAt: new Date().toISOString(),
	};
	users.push(data);
	await saveUserToFile(users);
	return data;
};

export const getUserPassword = async (username) => {
	const users = await readUserFromFile();
	const data = users.find(
		(user) => username.toLowerCase() === user.username.toLowerCase(),
	);
	if (!data) return;
	return data;
};

export const getCurrentUser = async (userId) => {
	const users = await readUserFromFile();
	return users.find((user) => userId === user.id);
};

export const getAllUsers = async () => {
	const users = await readUserFromFile();
	return users;
};
