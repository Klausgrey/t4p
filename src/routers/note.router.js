import express from "express";
import {
	create,
	UserNote,
	getNotes,
	patchNote,
} from "../controllers/note.controller.js";
import { verifytoken } from "../middleware/authMiddleware.js";
import { get } from "node:http";

const router = express.Router();
router.post("/", verifytoken, create);
router.get("/", verifytoken, UserNote);
router.get("/all", verifytoken, getNotes);
router.patch("/:id", verifytoken, patchNote);

export default router;
