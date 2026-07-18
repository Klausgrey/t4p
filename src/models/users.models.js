import { v4 } from "uuid";
const users = [];

export const createUser = (username, password) => {
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
	return data;
};

export const getUserPassword = (username) => {
	const data = users.find(
		(user) => username.toLowerCase() === user.username.toLowerCase(),
	);
	if (!data) return;
	return data;
};

export const getCurrentUser = (userId) => {
	return (data = users.find((user) => userId === user.id));
};

export const getalluser = () => {
	return users
}

