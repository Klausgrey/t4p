const fs = require("fs")



class BankAccount {
	constructor(balance) {
		if (typeof balance !== "number" || isNaN(balance)) {
			this.balance = balance;
		} else if (balance < 0 || balance === null || balance === undefined) {
			this.balance = 0;
			console.log("Invalid");
		} else if (balance >= 0) {
			this.balance = 0;
			console.log("Invalid amount. Please enter a positive number.");
			return;
		}
	}

	creditAmount(amount) {
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			console.log("Invalid amount. Please enter a positive number.");
			return;
		}

		this.balance = this.balance + amount;
	}

	debitAmount(amount) {
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			console.log("Invalid amount. Please enter a positive number.");
			return;
		}
		if (amount > this.balance) {
			console.log("Debit amount exceeds account balance.");
			return;
		}

		this.balance = this.balance - amount;
	}

	getBalance() {
		return this.balance;
	}
}

const user1 = new BankAccount("2000");
user1.creditAmount(200);
user1.debitAmount(400);
console.log(user1.getBalance());
// console.log(user1.balance);
