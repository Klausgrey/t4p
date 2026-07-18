import { v4 } from "uuid";
const users = [];

export const createUser = (id, username, password) => {
	const existing = users.find((user) => username == user.username);
	if (existing) return `user already exists...`;
	const data = {
		id: v4(),
		username,
		password,
		createdAt: new Date().toISOString(),
	};
	users.push(data);
	return data;
};
