import {
	createNote,
	getUserNote,
	getAllNotes,
	patchUserNote,
} from "../models/noteStore.js";

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

export const UserNote = async (req, res) => {
	const userId = req.user.id;
	try {
		const data = getUserNote(userId);
		res.status(200).json({ status: "success", data });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch notes" });
	}
};

export const getNotes = (req, res) => {
	const userId = req.user.id;
	try {
		const user = getAllNotes();
		res.status(200).json({ status: "success", user });
	} catch (err) {
		res.status(501).json(err);
	}
};

export const patchNote = async (req, res) => {
	const noteId = req.params.id;
	const userId = req.user.id;

	const updates = req.body;

	try {
		const updatedNote = patchUserNote(userId, noteId, updates);
		if (!updatedNote)
			return res.status(401).json({ error: "Invalid username or password..." });
		res.status(200).json({
			message: "Note updated successfully.",
			data: updatedNote,
		});
	} catch (err) {
		return res.status(500).json({ error: "Internal server error." });
	}
};
