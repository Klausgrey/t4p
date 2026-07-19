import express from "express";
import {
	create,
	UserNote,
	getNotes,
	patchNote,
	deleteNote
} from "../controllers/note.controller.js";
import { verifytoken } from "../middleware/authMiddleware.js";
import { get } from "node:http";
import { validate } from "uuid";

const router = express.Router();
router.post("/", verifytoken, create);
router.get("/", verifytoken, UserNote);
router.get("/all", verifytoken, getNotes);
router.patch("/:id", verifytoken, patchNote);
router.delete("/:id", validate, deleteNote)

export default router;
