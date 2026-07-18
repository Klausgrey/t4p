import express from "express";
import { create, getNote } from "../controllers/note.controller.js";
import { verifytoken } from "../middleware/authMiddleware.js";
import { get } from "node:http";

const router = express.Router();
router.post("/", verifytoken, create);
router.get("/", verifytoken, getNote);

export default router;
