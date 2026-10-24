import { validate } from "../middleware/validate.js";
import {
	createAccount,
	getAccountDetails,
	getAccountSummary,
	getAccountNumber
} from "../controllers/accountController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { accountSchema } from "../validators/accountValidators.js";

import express from "express";
const router = express.Router();

router.post("/", authMiddleware, validate(accountSchema), createAccount);
router.get("/", authMiddleware, getAccountDetails);
router.get("/summary", authMiddleware, getAccountSummary);
router.get("/:accountNumber", authMiddleware, getAccountNumber);

export default router;
