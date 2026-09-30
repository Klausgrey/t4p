import { registerUser } from "./controllers/authController.js";
import { validate } from "./middleware/validate.js";
import { registerSchema, loginSchema } from "./validators/authValidators.js";
import express from "express";
const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

export default router;
