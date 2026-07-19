import express from "express";
import {
	create,
	userNote,
	getNotes,
	patchNote,
	deleteNote
} from "../controllers/note.controller.js";
import { verifytoken } from "../middleware/authMiddleware.js";
import { get } from "node:http";
import { validate } from "uuid";

const router = express.Router();
router.post("/", verifytoken, create);
router.get("/", verifytoken, userNote);
router.get("/all", verifytoken, getNotes);
router.patch("/:id", verifytoken, patchNote);
router.delete("/:id", validate, deleteNote)

export default router;
