class BankAccount {
	constructor(balance) {
		if (balance >= 0) this.balance = balance;
		if (balance < 0) {
			this.balance = 0;
			throw new Error("initial balance was invalid");
		}
	}

	creditAmount(amount) {
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0)
			return console.log("Enter a positive amount");
		this.balance += amount;
	}

	debitAmount(amount) {
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0)
			return console.log("Enter a positive amount");

		if (amount > this.balance)
			return console.log("Debit amount exceeds account balance");

		this.balance -= amount;
	}

	getBalance() {
		return this.balance;
	}
}

let s1 = new BankAccount(-100000);
s1.creditAmount(1000);
s1.debitAmount(300);
console.log(s1.getBalance());
