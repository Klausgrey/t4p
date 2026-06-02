class BankAccount {
	constructor(balance) {
		if (balance < 0 || balance === null || balance === undefined) {
			throw new Error("Balance cannot be negative");
		}
		this.balance = balance;
	}

	creditAmount(amount) {
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			return console.log("Invalid amount. Please enter a positive number.");
		}

		this.balance = this.balance + amount;
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

const user1 = new BankAccount(-1000);
user1.creditAmount("100");
user1.debitAmount(99);
console.log(user1.getBalance());
// console.log(user1.balance);
