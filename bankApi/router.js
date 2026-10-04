import { registerUser, loginUser } from "./controllers/authController.js";
import { validate } from "./middleware/validate.js";
import { registerSchema, loginSchema } from "./validators/authValidators.js";
import express from "express";
const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;
