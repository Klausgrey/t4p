const BankAccount = require("./object")

const user1 = new BankAccount();
user1.creditAmount("2000");
user1.debitAmount(400);
console.log(user1.getMainBalance());
