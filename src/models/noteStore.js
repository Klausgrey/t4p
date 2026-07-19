import { v4 } from "uuid";
const notes = [];

export const createNote = (userId, title, body, tag) => {
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
	return notes
}


export const patchUserNote = (userId, noteId, updates) => {
	const note = notes.find((n) => n.id === noteId)
	if (!note) return
	if (userId !== note.userId) return

	Object.assign(note, updates)
	return note
}