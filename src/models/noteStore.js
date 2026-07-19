import { v4 } from "uuid";
const notes = [];
const ALLOWED_TAGS = ["personal", "work", "other"];

export const createNote = (userId, title, body, tag) => {
	if (!ALLOWED_TAGS.includes(tag)) {
		throw new Error("INVALID_TAG");
	}
	const newNote = {
		id: v4(),
		userId,
		title,
		body,
		tag,
		createdAt: new Date().toISOString,
	};

	notes.push(newNote);
	return newNote;
};

export const getUserNote = (userId) => {
	return notes.filter((notes) => notes.userId === userId);
};

export const getAllNotes = () => {
	return notes;
};

export const patchUserNote = (userId, noteId, updates) => {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return "NOT FOUND";
	if (userId !== note.userId) return "FORBIDDEN";
	if (updates.tag && !ALLOWED_TAGS.includes(updates.tag)) throw new Error("INVALID_TAG");
	Object.assign(note, updates);
	return note;
};

export const deleteUserNote = (userId, noteId) => {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return "NOT FOUND";
	if (note.userId !== userId) return "FORBIDDEN";

	const noteIndex = notes.findIndex((n) => noteId === n.id);
	if (noteIndex === -1) return "NOT FOUND";

	notes.splice(noteIndex);
	return "SUCCESS";
};
