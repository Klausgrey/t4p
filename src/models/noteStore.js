import { v4 } from "uuid";
import fs from "fs/promises";
const ALLOWED_TAGS = ["personal", "work", "other"];

const readNotesFromFile = async () => {
	try {
		const fileData = await fs.readFile("notes.json", "utf8");
		return JSON.parse(fileData);
	} catch (err) {
		return [];
	}
};

const saveNotesToFile = async (notes) => {
	const stringData = JSON.stringify(notes, null, 4);
	await fs.writeFile("notes.json", stringData, "utf8");
};

export const createNote = async (userId, title, body, tag) => {
	const notes = await readNotesFromFile();
	if (!ALLOWED_TAGS.includes(tag)) {
		throw new Error("INVALID_TAG");
	}
	const newNote = {
		id: v4(),
		userId,
		title,
		body,
		tag,
		createdAt: new Date().toISOString(),
	};

	notes.push(newNote);
	await saveNotesToFile(notes);
	return newNote;
};

export const getUserNote = async (userId) => {
	const notes = await readNotesFromFile();
	return notes.filter((notes) => notes.userId === userId);
};

export const getAllNotes = async () => {
	const notes = await readNotesFromFile();
	return notes;
};

export const patchUserNote = async (userId, noteId, updates) => {
	const notes = await readNotesFromFile();
	const note = notes.find((n) => n.id === noteId);
	if (!note) return "NOT FOUND";
	if (userId !== note.userId) return "FORBIDDEN";
	if (updates.tag && !ALLOWED_TAGS.includes(updates.tag))
		throw new Error("INVALID_TAG");
	Object.assign(note, updates);
	await saveNotesToFile(notes);
	return note;
};

export const deleteUserNote = async (userId, noteId) => {
	const notes = await readNotesFromFile();
	const note = notes.find((n) => n.id === noteId);
	if (!note) return "NOT FOUND";
	if (note.userId !== userId) return "FORBIDDEN";

	const noteIndex = notes.findIndex((n) => noteId === n.id);
	if (noteIndex === -1) return "NOT FOUND";

	notes.splice(noteIndex, 1);
	await saveNotesToFile(notes);
	return "SUCCESS";
};
