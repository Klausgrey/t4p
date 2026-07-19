import express from "express";
import {
	register,
	login,
	getUsers,
	getAll,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getUsers);
router.get("all/profiles", getAll);
export default router;
