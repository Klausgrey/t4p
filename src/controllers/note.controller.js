import {
	createNote,
	getUserNote,
	getAllNotes,
	patchUserNote,
	deleteUserNote,
} from "../models/noteStore.js";

export const create = async (req, res) => {
	const userId = req.user.id;
	const { title, body, tag } = req.body;

	try {
		const data = await createNote(userId, title, body, tag);
		res.status(201).json({
			message: "note created successfully...",
			data,
		});
	} catch (err) {
		if (err.message === "INVALID_TAG") {
			return res.status(400).json({
				error:
					"Invalid tag value. Tag must be one of: personal, work, or other.",
			});
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const userNote = async (req, res) => {
	const userId = req.user.id;
	const { tag } = req.query;
	try {
		let users = await getUserNote(userId);
		if (tag) {
			users = users.filter(
				(note) => note.tag.toLowerCase() === tag.toLowerCase(),
			);
		}
		res.status(200).json({ status: "success", data: users });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch notes" });
	}
};

export const getNotes = async (req, res) => {
	const userId = req.user.id;
	try {
		const user = await getAllNotes();
		res.status(200).json({ status: "success", user });
	} catch (err) {
		res.status(501).json(err);
	}
};

export const patchNote = async (req, res) => {
	const noteId = req.params.id;
	const userId = req.user.id;

	const updates = req.body;
	if (!updates || Object.keys(updates).length === 0)
		return res.status(400).json({ error: "Request body cannot be empty" });

	try {
		const updatedNote = await patchUserNote(userId, noteId, updates);
		if (updatedNote === "NOT FOUND")
			return res.status(404).json({ error: "Note not found..." });
		if (updatedNote === "FORBIDDEN")
			return res.status(403).json({ error: "You don't own this note" });
		res.status(200).json({
			message: "Note updated successfully.",
			data: updatedNote,
		});
	} catch (err) {
		if (err.message === "INVALID_TAG") {
			return res.status(400).json({
				error:
					"Invalid tag value. Tag must be one of: personal, work, or other.",
			});
		}
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteNote = async (req, res) => {
	const noteId = req.params.id;
	const userId = req.user.id;

	try {
		const status = await deleteUserNote(userId, noteId);
		if (status === "NOT FOUND")
			return res.status(404).json({ error: "Note not found" });
		if (status === "FORBIDDEN")
			return res.status(403).json({ error: "You don't own this note" });
		res.status(200).json({
			message: "Note deleted...",
		});
	} catch (err) {
		return res.status(500).json({ error: "Internal server error." });
	}
};
