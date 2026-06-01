class BankAccount {
	constructor(balance) {
		if (balance < 0) throw new Error("balance cannot be negative");
		this.balance = balance;
	}

	creditAmount(amount) {
		this.balance = this.balance + amount
	}

	debitAmount(amount) {
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			return console.log("Invalid amount. Please enter a positive number.");
		}
		if (amount > this.balance) {
			return console.log("Debit amount exceeds account balance.");
		}

		this.balance = this.balance - amount;
	}

	getBalance() {
		return this.balance;
	}
}

const user1 = new BankAccount(0)

try {
	user1.creditAmount(2000)
	user1.debitAmount(100);
	console.log(user1.getBalance())

} catch (err) {
	console.log(err);
}
// console.log(user1.balance);