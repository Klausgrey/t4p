import { validate } from "../middleware/validate.js";
import {
	createAccount,
	getAccountDetails,
	getAccountSummary,
	getAccountNumber,
	deposit,
	withdraw,
	transfer,
} from "../controllers/accountController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
	accountSchema,
	depositWithdrawSchema,
	transferSchema,
} from "../validators/accountValidators.js";

import express from "express";
const router = express.Router();

router.post("/", authMiddleware, validate(accountSchema), createAccount);
router.get("/", authMiddleware, getAccountDetails);
router.get("/summary", authMiddleware, getAccountSummary);
router.get("/:accountNumber", authMiddleware, getAccountNumber);
router.post(
	"/deposit",
	authMiddleware,
	validate(depositWithdrawSchema),
	deposit,
);
router.post(
	"/withdraw",
	authMiddleware,
	validate(depositWithdrawSchema),
	withdraw,
);
router.post("/transfer", authMiddleware, validate(transferSchema), transfer);

export default router;
