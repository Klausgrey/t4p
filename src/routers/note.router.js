import express from "express";
import {
	create,
	userNote,
	getNotes,
	patchNote,
	deleteNote,
} from "../controllers/note.controller.js";
import { verifytoken } from "../middleware/authMiddleware.js";
import { validateBody } from "../middleware/validateBody.js";

const router = express.Router();

router.post("/", verifytoken, validateBody(["title", "body", "tag"]), create);
router.get("/", verifytoken, userNote);
router.get("/all", verifytoken, getNotes);
router.patch("/:id", verifytoken, patchNote);
router.delete("/:id", verifytoken, deleteNote);

export default router;
