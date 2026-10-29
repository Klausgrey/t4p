# Bank Account API

A REST API for user registration and login, bank account management, deposits, withdrawals, and transfers. It is built with Node.js, Express, and MySQL. Protected routes use JSON Web Tokens (JWT).

## Requirements

- Node.js and npm
- MySQL
- A MySQL database with the tables defined for this project

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project directory:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=bankapi
   JWT_SECRET=replace_with_a_long_random_secret
   JWT_EXPIRES_IN=2h
   ```

   Use a strong, private value for `JWT_SECRET`. Do not commit `.env` or share its contents.

3. Set up the MySQL database and tables using [schema.sql](./schema.sql). **Review the file before running it:** it currently contains `DROP DATABASE bankapi`, which deletes the entire database and its data. Remove that statement from a reviewed copy before applying the schema to any database you need to keep.

4. Start the API:

   ```bash
   npm run dev
   ```

   The server listens on `http://localhost:3000`.

## API

All request and response bodies use JSON. Send `Content-Type: application/json` with requests that have a body. The API does not currently define a version prefix or a health-check route.

### Authentication

#### Register

`POST /api/auth/register`

Public route. `confirmPassword` is required for validation and must match `password`.

```json
{
  "firstName": "Nick",
  "lastName": "Daniel",
  "email": "nickdaniel@gmail.com",
  "phoneNumber": "08012345678",
  "password": "example-password",
  "confirmPassword": "example-password"
}
```

Validation rules: first and last names are 2–30 characters; email must be valid; phone number must match the Nigerian phone-number pattern (`0...` or `+234...`); password must be at least 8 characters. On success, returns `201` with the new user's `id`, `firstName`, `lastName`, `email`, and `phoneNumber`. Duplicate email or phone returns `409`.

#### Log in

`POST /api/auth/login`

Public route.

```json
{
  "email": "nickdaniel@gmail.com",
  "password": "example-password"
}
```

On success, returns `200` with a JWT:

```json
{
  "token": "<jwt>"
}
```

Use the token as a bearer token on protected routes. An unknown email or incorrect password returns `401`; an inactive user returns `403`.

### Accounts

All account routes below require this header:

```http
Authorization: Bearer <jwt>
```

#### Create an account

`POST /api/accounts`

```json
{
  "accountType": "savings",
  "currency": "NGN"
}
```

`accountType` must be `savings`, `current`, or `fixed`. `currency` must be a three-letter uppercase code. Although the validator declares `NGN` as a default, the current validation middleware does not copy Joi's defaulted value back into the request, so send `currency` explicitly. A successful request returns `201` with the account number, type, currency, and a message. The API returns `409` if the user already has three accounts.

#### Get account details

`GET /api/accounts`

Returns `200` with an `account` object containing the user's name and email and one account's account number, type, currency, and balance. The current implementation returns a single account object, not an array of all accounts.

#### Get account summary

`GET /api/accounts/summary`

Returns `200` with an `account` object containing the user's name, active account count, total/highest/lowest balance for active accounts, and debit/credit transaction counts.

#### Get an account by account number

`GET /api/accounts/:accountNumber`

Returns `200` with an `account` object containing account details and the total transaction count. Returns `404` if the account does not exist and `403` if it belongs to another user.

#### Deposit

`POST /api/accounts/deposit`

```json
{
  "accountNumber": "1234567890",
  "amount": 250.5,
  "description": "Cash deposit"
}
```

`description` is optional. Account numbers must be 10 characters; `amount` must be greater than zero and have no more than two decimal places. Returns `200` on success. The account must belong to the authenticated user and be active.

#### Withdraw

`POST /api/accounts/withdraw`

```json
{
  "accountNumber": "1234567890",
  "amount": 50,
  "description": "Cash withdrawal"
}
```

Uses the same validation rules as a deposit. Returns `422` if the balance is insufficient; the account must belong to the authenticated user and be active.

#### Transfer

`POST /api/accounts/transfer`

```json
{
  "fromAccountNumber": "1234567890",
  "toAccountNumber": "0987654321",
  "amount": 75,
  "description": "Transfer"
}
```

Account numbers must be 10 characters and must differ. `amount` must be greater than zero and have no more than two decimal places; `description` is optional. The sender account must belong to the authenticated user, and both accounts must be active. Returns `422` if the sender has insufficient funds.

### Validation and error responses

Validation failures return `400` with an error and a list of details:

```json
{
  "error": "Validation failed",
  "details": ["<validation message>"]
}
```

Protected routes return `401` if no bearer token is supplied and `403` if the token is invalid. Other route-specific errors may include `400` for inactive accounts, `403` for account ownership restrictions, `404` for missing accounts, `409` for duplicate users or the account limit, `422` for insufficient funds, and `500` for server or database errors.


## Project layout

```text
bankApi/
├── controllers/     # Authentication and account request handlers
├── middleware/     # Request validation and JWT authentication
├── routers/        # Express route definitions
├── validators/     # Joi request schemas
├── db.js           # MySQL connection pool
├── index.js        # Express application entry point
└── schema.sql      # MySQL database schema
```