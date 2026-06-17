const BankAccount = require("./bankAccount");

const user1 = new BankAccount();
user1.creditAmount("1", 2000);
user1.debitAmount("1", 400);
console.log(user1.getBalance("1"));

// test self transfer
user1.transfer("1", "1", 500);

// test inactive account
user1.transfer("1", "3", 500);

// test normal transfer
user1.transfer("1", "2", 1000);

console.log(user1.getBalance("2"));
