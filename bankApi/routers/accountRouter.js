import { validate } from "../middleware/validate.js";
import { createAccount } from "../controllers/accountController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { accountSchema } from "../validators/accountValidators.js"

import express from "express";
const router = express.Router();

router.post(
	"/",
	authMiddleware,
	validate(accountSchema),
	createAccount,
);

export default router;
