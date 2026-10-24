import { pool as db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "node:crypto";

export async function createAccount(req, res) {
	const { accountType, currency } = req.body;
	try {
		const accountNumber = crypto.randomInt(100_000, 1_000_000).toString();
		const id = uuidv4();
		const userId = req.user.id;

		const [[{ count }]] = await db.query(
			`select count(*) as count from accounts where userId = ?`,
			[userId],
		);

		if (count >= 3)
			return res
				.status(409)
				.json({ message: "you cannot create more than 3 bank accounts" });

		await db.query(
			`insert into accounts (id, userId, accountNumber, accountType, currency) values (?, ?, ?, ?, ?)`,
			[id, userId, accountNumber, accountType, currency],
		);
		res.status(201).json({
			accountNumber,
			accountType,
			currency,
			message: "Account created successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}
export async function getAccountDetails(req, res) {
	const userId = req.user.id;
	try {
		const [[account]] = await db.query(
			`select u.firstName, u.lastName, u.email, a.accountNumber, a.accountType, a.currency, a.balance from users u join accounts a on u.id = a.userId where u.id = ?`,
			[userId],
		);
		res.status(200).json({ account });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}

export async function getAccountSummary(req, res) {
	const userId = req.user.id;
	try {
		const [[account]] = await db.query(
			`select
			u.firstName, u.lastName,
			count(a.id) as totalAccounts,
			sum(a.balance) as totalBalance,
			max(a.balance) as highestBalance,
			min(a.balance) as lowestBalance,

			(
			select count(*)
			from transactions t
			join accounts src
			on src.id = t.sourceAccountId
			where src.userId = u.id
			) as total_debits,

			(
			select count(*)
			from transactions t
			join accounts dest
			on dest.id = t.destinationAccountId
			where dest.userId = u.id
			) as total_credits

			from users u
			join accounts a
			on a.userId = u.id
			and a.isActive = 1
			where u.id = ?
			group by u.id, u.firstName, u.email
			`,
			[userId],
		);

		res.status(200).json({ account });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error processing request" });
	}
}

export async function getAccountNumber(req, res) {
	const userId = req.user.id;
	const { accountNumber } = req.params;

	try {
		const [rows] = await db.query(
			`SELECT
        a.id,
        a.userId,
        a.accountNumber,
        a.accountType,
        a.balance,
        a.currency,
        a.isActive,
        a.createdAt,
        u.firstName,
        u.lastName,
        u.email,

        (
          SELECT COUNT(*)
          FROM transactions t
          WHERE t.sourceAccountId = a.id
             OR t.destinationAccountId = a.id
        ) AS totalTransactions

      FROM accounts a
	  JOIN users u
        ON u.id = a.userId

      WHERE a.accountNumber = ?`,
			[accountNumber],
		);

		const account = rows[0];

		if (!account) {
			return res.status(404).json({
				message: "Account not found",
			});
		}

		if (userId !== account.userId) {
			return res.status(403).json({
				message: "Forbidden: You do not own this account",
			});
		}

		const { userId: ownerId, ...accountDetails } = account;

		return res.status(200).json({
			account: accountDetails,
		});

	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: "error processing request",
		});
	}
}
