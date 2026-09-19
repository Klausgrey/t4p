# Problem Statement: BankAccount Class

## Overview

Design and implement a `BankAccount` class that simulates the basic operations a bank might perform on a customer's account.

---

## Class Design

### Data Member

- An integer data member to represent the **account balance**.

### Constructor

- Accepts an **initial balance** as a parameter and uses it to initialize the balance data member.
- **Validates** the initial balance:
  - If the initial balance is **greater than or equal to 0**, initialize the balance to that value.
  - If the initial balance is **less than 0**, set the balance to `0` and display an error message indicating that the initial balance was invalid.

---

## Member Functions

| Function | Description |
|---|---|
| `creditAmount(amount)` | Adds the specified amount to the current balance. |
| `debitAmount(amount)` | Withdraws the specified amount from the account. If the debit amount **exceeds** the current balance, the balance is left unchanged and a message is printed: *"Debit amount exceeds account balance."* |
| `getBalance()` | Returns the current account balance. |

---

## Requirements

1. Implement the `BankAccount` class with the data member, constructor, and three member functions described above.
2. Write a program that **creates three `BankAccount` objects**, each initialized with a different starting balance (include at least one invalid/negative balance to test validation).
3. Test **all three member functions** on each account object, demonstrating:
   - A successful credit operation.
   - A successful debit operation.
   - An attempted debit that exceeds the balance (triggering the error message).
   - Retrieval of the balance using `getBalance()`.

---

## Expected Behavior

- Accounts initialized with a negative balance should display an error and start with a balance of `0`.
- Crediting an account should increase the balance by the given amount.
- Debiting an account should decrease the balance only if sufficient funds exist; otherwise, the balance remains unchanged and an appropriate message is shown.
- `getBalance()` should always reflect the current, up-to-date balance of the account.
