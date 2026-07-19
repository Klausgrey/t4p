import express from "express";
import {
	register,
	login,
	getUsers,
	getAll,
} from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/validateBody.js";

const router = express.Router();

router.post("/register", validateBody(["username", "password"]), register);
router.post("/login", validateBody(["username", "password"]), login);
router.get("/profile", getUsers);
router.get("all/profiles", getAll);
export default router;
