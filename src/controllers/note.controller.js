import { createNote, getUserNote } from "../models/noteStore.js";

export const create = async (req, res) => {
	const userId = req.user.id;
	const { title, body, tag } = req.body;

	try {
		const data = createNote(userId, title, body, tag);
		res.status(201).json({
			message: "note created successfully...",
			data,
		});
	} catch (err) {
		res.status(500).json({ error: "Failed to create note" });
	}
};

export const getNote = async (req, res) => {
	const userId = req.user.id;
	try {
		const data = getUserNote(userId);
		res.status(200).json({ status: "success", data });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch notes" });
	}
};

export const patchNote = async (req, res) => {
	
}
