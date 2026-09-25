# Backend Engineering — Capstone Assignment
## Bank Account REST API: Design, Normalise, and Build

---

| | |
|---|---|
| **Topics** | Database Design, ERD, Normalisation, REST API, Joi Validation, MySQL, Bearer Auth |
| **Language** | JavaScript (Node.js + Express) |
| **Database** | MySQL |
| **Estimated Duration** | 12 to 16 hours |
| **Assessment Type** | Individual |
| **Phases** | Phase 1 — Design (submit before coding) · Phase 2 — Implementation |

---

## 1. Overview

You will design and build a production-style **Bank Account REST API**. The work is split into two phases.

**Phase 1** requires you to think through the data model before writing any code. You will identify entities, map relationships, draw an ERD, normalise the schema to 3NF, and produce a final `schema.sql`. This deliverable is reviewed and signed off before Phase 2 begins.

**Phase 2** is the implementation — Node.js, Express, MySQL, Joi validation, bcrypt, JWT Bearer authentication, raw SQL with joins, subqueries, and MySQL transactions.

You are not given the schema. You derive it from the business rules in Section 2.

---

## 2. Business Rules

Read these carefully. Every table you create, every column you add, and every relationship you draw must be traceable to one of these rules. If a rule is ambiguous, document your interpretation in your design notes.

### Users
- A person must register with a full name, a unique email address, a unique phone number, and a password before they can use the system.
- A user can be active or inactive. An inactive user cannot log in.
- Every time a user registers or logs in, that event must be recorded with the user, the action taken, the IP address of the request, and the time it happened.

### Accounts
- A registered user can open one or more bank accounts. A single user may not hold more than 3 active accounts at the same time.
- Each account belongs to exactly one user.
- Each account has a unique 10-digit account number, an account type (savings, current, or fixed), a balance, and a currency.
- An account can be active or inactive. Financial operations cannot be performed on an inactive account.

### Transactions
- Money can enter an account via a deposit, leave via a withdrawal, or move between two accounts via a transfer.
- Every transaction must record the amount, the type, an optional description, a unique reference code, the time it was created, and a status (pending, completed, or failed).
- A deposit has a destination account but no source account.
- A withdrawal has a source account but no destination account.
- A transfer has both a source account and a destination account.
- The system must be able to reconstruct the full history of any account by querying transactions.

### Balances and Integrity
- A balance may never go below zero.
- A deposit, withdrawal, or transfer must either fully succeed or fully fail — there must be no state where money has left one account but not arrived at the other.

---

## 3. Phase 1 — Database Design

Complete every step in this phase and document your work in a file called `design.md`. Submit `design.md` and `schema.sql` before writing any application code.

---

### Step 1 — Entity Identification

List every entity the system needs to store data about. For each entity write:

- The entity name
- A one-sentence description of what it represents
- The real-world object or concept it maps to

**Deliverable:** A numbered list of entities in `design.md`.

---

### Step 2 — Attribute Mapping

For each entity, list every attribute it needs. For each attribute state:

- The attribute name (snake_case)
- The MySQL data type you will use and why
- Whether it is required (NOT NULL) or optional
- Any constraint it carries (UNIQUE, CHECK, DEFAULT, ENUM)

Use this format in `design.md`:

```
Entity: users
--------------------------------------------------
id            INT, AUTO_INCREMENT — surrogate PK
full_name     VARCHAR(150), NOT NULL — person's legal name
...
```

Justify any non-obvious type choices. For example — why DECIMAL and not FLOAT for balance? Why TINYINT(1) and not BOOLEAN for flags?

---

### Step 3 — Relationship Mapping

For every pair of related entities, state:

- The relationship name (e.g. "a user opens accounts")
- The cardinality — One-to-One, One-to-Many, or Many-to-Many
- Which side carries the foreign key and why
- The referential action on DELETE (RESTRICT, CASCADE, SET NULL) and justify the choice

Present this as a relationship table in `design.md`:

| Relationship | Cardinality | FK Location | ON DELETE | Justification |
|-------------|-------------|-------------|-----------|---------------|
| users → accounts | 1:N | accounts.user_id | RESTRICT | Deleting a user with accounts would destroy financial records |
| ... | ... | ... | ... | ... |

---

### Step 4 — Entity-Relationship Diagram

Draw a complete ERD showing every entity, every attribute, every primary key, every foreign key, and every relationship with its cardinality notation (use crow's foot or Chen notation — state which you are using).

The ERD must be submitted as either:

- A PNG or PDF exported from a tool (draw.io, dbdiagram.io, Lucidchart, MySQL Workbench), **or**
- An ASCII diagram in `design.md` if no tool is available — it must be readable and complete

Every entity box must show column names and data types. Relationships must show cardinality at both ends.

---

### Step 5 — Normalisation

Take your initial attribute mapping from Step 2 and walk through each Normal Form. Document your reasoning — do not simply state that the schema is normalised.

#### 5.1 First Normal Form (1NF)

Check every attribute across all entities. For each one confirm — or fix — that:

- It holds a single, atomic value (no comma-separated lists, no arrays)
- There are no repeating groups of columns

Show at least one example of a design decision where you considered a 1NF violation and resolved it. Example prompt: *"Could phone numbers be stored as a single comma-separated field? Why or why not?"*

#### 5.2 Second Normal Form (2NF)

2NF only applies to tables with a composite primary key. For each such table:

- Identify the composite key
- Confirm that every non-key column depends on the full key, not just part of it
- Show any partial dependency you found and how you resolved it

If none of your tables have composite keys, state why and note which tables you considered.

#### 5.3 Third Normal Form (3NF)

For every table, confirm that no non-key column depends on another non-key column (no transitive dependencies). Walk through at least one potential transitive dependency you considered — for example:

> *"The transactions table could have stored account_type alongside from_account_id. This would be a transitive dependency because account_type depends on from_account_id, not on transactions.id. I resolved this by leaving account_type in the accounts table and joining when needed."*

Document at least three such considerations — one per entity group.

#### 5.4 Final Normalised Schema Summary

After completing 1NF through 3NF, produce a clean summary table listing every final table with its columns, types, and constraints before writing any SQL.

| Table | Column | Type | Constraints |
|-------|--------|------|-------------|
| users | id | INT | PK, AUTO_INCREMENT |
| users | email | VARCHAR(255) | NOT NULL, UNIQUE |
| ... | ... | ... | ... |

---

### Step 6 — schema.sql

Write the final `schema.sql` that creates the database from your normalised design. It must include:

- `DROP TABLE IF EXISTS` statements in the correct dependency order
- All `CREATE TABLE` statements with full constraints, foreign keys, and referential actions
- All indexes — on foreign key columns, on columns you filter or sort by frequently, and on any composite index you have reasoned about
- Comments on any non-obvious decision

The schema must be runnable without errors:

```bash
mysql -u root -p bank_api < schema.sql
```

---

### Phase 1 Deliverables Checklist

- [ ] `design.md` — entities listed with descriptions
- [ ] `design.md` — attribute mapping with type justifications for every column
- [ ] `design.md` — relationship table with cardinality, FK location, ON DELETE, and justification
- [ ] ERD submitted (PNG, PDF, or complete ASCII in `design.md`)
- [ ] `design.md` — 1NF walkthrough with at least one resolved example
- [ ] `design.md` — 2NF walkthrough covering composite-key tables
- [ ] `design.md` — 3NF walkthrough with at least three transitive dependency considerations
- [ ] `design.md` — normalised schema summary table
- [ ] `schema.sql` — runs without errors, all constraints and indexes present

---

## 4. Phase 2 — Implementation

Begin Phase 2 only after `design.md` and `schema.sql` have been reviewed.

---

### 4.1 Project Structure

```
bank-api/
  index.js                  entry point — loads env, connects DB, mounts router
  db.js                     MySQL connection pool (mysql2/promise)
  router.js                 all route definitions
  middleware/
    authMiddleware.js        Bearer JWT verification
    validate.js             Joi middleware factory
  validators/
    authValidators.js        Joi schemas for register and login
    accountValidators.js     Joi schemas for account and transfer routes
  controllers/
    authController.js        register, login
    accountController.js     create, list, deposit, withdraw, transfer, history, summary
  design.md                  Phase 1 design document
  schema.sql                 final normalised schema
  .env                       environment variables (not committed)
  .env.example               committed template
```

---

### 4.2 Environment Variables

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=bank_api
JWT_SECRET=replace_with_long_random_string
JWT_EXPIRES_IN=2h
BCRYPT_SALT_ROUNDS=10
```

Load at the top of `index.js` with `import "dotenv/config"`. All values must come from `process.env`. Add `.env` to `.gitignore`. Commit `.env.example`.

---

### 4.3 Database Connection (db.js)

```javascript
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;
```

Use `pool.execute(sql, params)` in all controllers. Never concatenate user input into SQL strings.

---

### 4.4 Joi Validation

#### Middleware Factory (middleware/validate.js)

```javascript
export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map(d => d.message);
        return res.status(400).json({ error: "Validation failed", details: messages });
    }
    next();
};
```

#### Auth Schemas (validators/authValidators.js)

**registerSchema**

| Field | Rules |
|-------|-------|
| `full_name` | String, 2 to 150 characters, required |
| `email` | Valid email format, lowercase, required |
| `phone` | String, 10 to 15 characters, numeric only, required |
| `password` | Minimum 8 characters, at least one uppercase, one digit, one special character, required |
| `confirm_password` | Must equal `password`, required |

**loginSchema**

| Field | Rules |
|-------|-------|
| `email` | Valid email format, required |
| `password` | Non-empty string, required |

#### Account Schemas (validators/accountValidators.js)

**createAccountSchema**

| Field | Rules |
|-------|-------|
| `account_type` | One of `savings`, `current`, `fixed`, required |
| `currency` | 3-character uppercase string, optional, defaults to `NGN` |

**depositWithdrawSchema**

| Field | Rules |
|-------|-------|
| `account_number` | String, exactly 10 characters, required |
| `amount` | Number greater than 0, max 2 decimal places, required |
| `description` | String, max 255 characters, optional |

**transferSchema**

| Field | Rules |
|-------|-------|
| `from_account_number` | String, exactly 10 characters, required |
| `to_account_number` | String, exactly 10 characters, required, must differ from `from_account_number` |
| `amount` | Number greater than 0, max 2 decimal places, required |
| `description` | String, max 255 characters, optional |

---

### 4.5 Auth Middleware (middleware/authMiddleware.js)

```javascript
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
```

---

### 4.6 API Endpoints

#### POST /api/auth/register — Public

**Middleware:** `validate(registerSchema)`

1. Return `409` if email or phone is already taken
2. Hash password with `bcrypt`
3. Insert into `users`
4. Insert into `audit_log` with action `"register"`, IP from `req.ip`
5. Return `201` with `{ id, full_name, email }`

---

#### POST /api/auth/login — Public

**Middleware:** `validate(loginSchema)`

1. Find user by email — `401` if not found
2. `bcrypt.compare` — `401` if password does not match
3. `401` if `is_active = 0`
4. Sign JWT payload `{ id, email, full_name }`
5. Insert into `audit_log` with action `"login"`
6. Return `200` with `{ token }`

---

#### POST /api/accounts — Protected

**Middleware:** `authMiddleware`, `validate(createAccountSchema)`

1. Count user's active accounts — `400` if already at 3
2. Generate a unique 10-digit `account_number`
3. Insert into `accounts` with `balance = 0.00`
4. Return `201` with the new account object

---

#### GET /api/accounts — Protected

**Middleware:** `authMiddleware`

Use a **JOIN** — return accounts with owner name resolved from the `users` table:

```sql
SELECT a.id, a.account_number, a.account_type, a.balance,
       a.currency, a.created_at, u.full_name AS owner_name
FROM accounts a
INNER JOIN users u ON u.id = a.user_id
WHERE a.user_id = ? AND a.is_active = 1
ORDER BY a.created_at ASC;
```

Return `200` with an array.

---

#### GET /api/accounts/summary — Protected

**Middleware:** `authMiddleware`

Use **GROUP BY aggregates** and **correlated subqueries**:

```sql
SELECT
    u.full_name, u.email,
    COUNT(a.id)    AS total_accounts,
    SUM(a.balance) AS total_balance,
    MAX(a.balance) AS highest_balance,
    MIN(a.balance) AS lowest_balance,
    (SELECT COUNT(*) FROM transactions t
     INNER JOIN accounts src ON src.id = t.from_account_id
     WHERE src.user_id = ?)  AS total_debits,
    (SELECT COUNT(*) FROM transactions t
     INNER JOIN accounts dest ON dest.id = t.to_account_id
     WHERE dest.user_id = ?) AS total_credits
FROM users u
INNER JOIN accounts a ON a.user_id = u.id
WHERE u.id = ? AND a.is_active = 1
GROUP BY u.id, u.full_name, u.email;
```

Return `200` with the summary object.

---

#### GET /api/accounts/:account_number — Protected

**Middleware:** `authMiddleware`

Use a **JOIN with a scalar subquery**:

```sql
SELECT
    a.id, a.account_number, a.account_type, a.balance,
    a.currency, a.is_active, a.created_at,
    u.full_name AS owner_name, u.email AS owner_email,
    (SELECT COUNT(*) FROM transactions t
     WHERE t.from_account_id = a.id OR t.to_account_id = a.id
    ) AS total_transactions
FROM accounts a
INNER JOIN users u ON u.id = a.user_id
WHERE a.account_number = ?;
```

Return `404` if not found. Return `403` if the account belongs to another user.

---

#### POST /api/accounts/deposit — Protected

**Middleware:** `authMiddleware`, `validate(depositWithdrawSchema)`

Wrap in a MySQL transaction:

1. Look up account — `404` / `403` / `400` (inactive) checks
2. `UPDATE accounts SET balance = balance + ?`
3. `INSERT INTO transactions` with `type = 'deposit'`, `to_account_id` set, `from_account_id = NULL`
4. `COMMIT` — return `200` with updated balance and transaction reference

---

#### POST /api/accounts/withdraw — Protected

**Middleware:** `authMiddleware`, `validate(depositWithdrawSchema)`

Wrap in a MySQL transaction:

1. Look up account — `404` / `403` / `400` checks
2. Return `422` if `balance < amount`
3. `UPDATE accounts SET balance = balance - ?`
4. `INSERT INTO transactions` with `type = 'withdrawal'`, `from_account_id` set, `to_account_id = NULL`
5. `COMMIT` — return `200`

---

#### POST /api/accounts/transfer — Protected

**Middleware:** `authMiddleware`, `validate(transferSchema)`

Wrap in a MySQL transaction:

1. Look up `from_account` — `404` / `403` / `400` checks
2. Look up `to_account` — `404` / `400` checks
3. Return `422` if `from_account.balance < amount`
4. `UPDATE` both balances
5. `INSERT INTO transactions` with `type = 'transfer'`, both account IDs set
6. `COMMIT` — return `200`. **On any error: `ROLLBACK`**

---

#### GET /api/accounts/:account_number/history — Protected

**Middleware:** `authMiddleware`

Use **four-table LEFT JOINs** with pagination:

```sql
SELECT
    t.id, t.reference, t.type, t.amount,
    t.description, t.status, t.created_at,
    fa.account_number AS from_account_number,
    fu.full_name      AS from_owner_name,
    ta.account_number AS to_account_number,
    tu.full_name      AS to_owner_name
FROM transactions t
LEFT JOIN accounts fa ON fa.id = t.from_account_id
LEFT JOIN users   fu ON fu.id = fa.user_id
LEFT JOIN accounts ta ON ta.id = t.to_account_id
LEFT JOIN users   tu ON tu.id = ta.user_id
WHERE t.from_account_id = ? OR t.to_account_id = ?
ORDER BY t.created_at DESC
LIMIT ? OFFSET ?;
```

Support `?page=1&limit=10`. Return `403` if the account does not belong to the logged-in user.

---

### 4.7 MySQL Transaction Pattern

```javascript
const conn = await pool.getConnection();
try {
    await conn.beginTransaction();
    // queries using conn.execute()
    await conn.commit();
    res.status(200).json({ ... });
} catch (err) {
    await conn.rollback();
    res.status(500).json({ error: "Transaction failed", detail: err.message });
} finally {
    conn.release();
}
```

---

### 4.8 Route Summary

| Method | Route | Auth | Joi Schema |
|--------|-------|------|-----------|
| POST | `/api/auth/register` | None | `registerSchema` |
| POST | `/api/auth/login` | None | `loginSchema` |
| POST | `/api/accounts` | Bearer | `createAccountSchema` |
| GET | `/api/accounts` | Bearer | None |
| GET | `/api/accounts/summary` | Bearer | None |
| GET | `/api/accounts/:account_number` | Bearer | None |
| GET | `/api/accounts/:account_number/history` | Bearer | None |
| POST | `/api/accounts/deposit` | Bearer | `depositWithdrawSchema` |
| POST | `/api/accounts/withdraw` | Bearer | `depositWithdrawSchema` |
| POST | `/api/accounts/transfer` | Bearer | `transferSchema` |

---

## 5. Acceptance Criteria

Run every scenario below in Postman before submitting. These are evaluated first — before any code review.

---

### AC-1 Register

```
POST /api/auth/register
{ "full_name": "Ada Okonkwo", "email": "ada@example.com",
  "phone": "08012345678", "password": "Secret@123", "confirm_password": "Secret@123" }
```

- [ ] Status `201` — `id`, `full_name`, `email` in response, no `password` field
- [ ] MySQL `users` row has a bcrypt hash, not plain text
- [ ] MySQL `audit_log` row exists with action `"register"`
- [ ] Duplicate email returns `409`
- [ ] Mismatched `confirm_password` returns `400` with Joi detail
- [ ] Weak password returns `400` naming the failed rules

---

### AC-2 Login

```
POST /api/auth/login
{ "email": "ada@example.com", "password": "Secret@123" }
```

- [ ] Status `200` with `token`
- [ ] Token decoded at jwt.io shows `id`, `email`, `full_name` in payload
- [ ] Wrong password returns `401`
- [ ] Missing field returns `400` with Joi detail
- [ ] `audit_log` has a new `"login"` row

---

### AC-3 Create Account

```
POST /api/accounts
Authorization: Bearer <token>
{ "account_type": "savings" }
```

- [ ] Status `201` — `account_number` is exactly 10 digits, `balance` is `0`
- [ ] No token returns `401`
- [ ] Invalid `account_type` returns `400` from Joi
- [ ] Creating a 4th account returns `400`

---

### AC-4 List Accounts

```
GET /api/accounts
Authorization: Bearer <token>
```

- [ ] Status `200` — array contains only the logged-in user's accounts
- [ ] Each item includes `owner_name` (JOIN confirmed)
- [ ] A second registered user sees only their own accounts

---

### AC-5 Account Detail

```
GET /api/accounts/:account_number
Authorization: Bearer <token>
```

- [ ] Status `200` — includes `total_transactions` (scalar subquery confirmed)
- [ ] Another user's account returns `403`
- [ ] Unknown number returns `404`

---

### AC-6 Deposit

```
POST /api/accounts/deposit
Authorization: Bearer <token>
{ "account_number": "3012345678", "amount": 50000.00 }
```

- [ ] Status `200` — response shows new balance and transaction reference
- [ ] `GET /api/accounts/:account_number` shows increased balance
- [ ] `transactions` table has a row with `type = "deposit"`
- [ ] Amount of `0` or negative returns `400` from Joi

---

### AC-7 Withdrawal

```
POST /api/accounts/withdraw
Authorization: Bearer <token>
{ "account_number": "3012345678", "amount": 200000.00 }
```

- [ ] Overdraft returns `422`
- [ ] Valid withdrawal returns `200` — balance in DB matches response exactly

---

### AC-8 Transfer

```
POST /api/accounts/transfer
Authorization: Bearer <token>
{ "from_account_number": "3012345678", "to_account_number": "3087654321", "amount": 10000.00 }
```

- [ ] Status `200`
- [ ] Sender balance reduced by the exact amount
- [ ] Receiver balance increased by the exact amount
- [ ] Same account for both fields returns `400` from Joi
- [ ] Transferring from another user's account returns `403`

---

### AC-9 Transaction History

```
GET /api/accounts/:account_number/history?page=1&limit=5
Authorization: Bearer <token>
```

- [ ] Status `200` — transfer rows include `from_owner_name` and `to_owner_name` (four-table JOIN confirmed)
- [ ] Page 2 returns the next batch correctly
- [ ] Another user's account history returns `403`

---

### AC-10 Account Summary

```
GET /api/accounts/summary
Authorization: Bearer <token>
```

- [ ] Status `200` — contains `total_accounts`, `total_balance`, `highest_balance`, `lowest_balance`, `total_debits`, `total_credits`
- [ ] `total_balance` equals the sum of balances in the DB
- [ ] `total_debits` and `total_credits` match actual row counts in `transactions` (correlated subqueries confirmed)

---

## 6. Marking Scheme

| Area | Criteria | Marks |
|------|----------|-------|
| **Phase 1 — Entity Identification** | All entities identified with clear descriptions | 5 |
| **Phase 1 — Attribute Mapping** | All columns listed with correct types and justified choices | 10 |
| **Phase 1 — Relationship Mapping** | All relationships correct — cardinality, FK placement, ON DELETE justification | 10 |
| **Phase 1 — ERD** | Complete, readable, all entities and relationships shown with correct notation | 10 |
| **Phase 1 — Normalisation** | 1NF, 2NF, 3NF each addressed with examples and resolutions documented | 15 |
| **Phase 1 — schema.sql** | Runs without errors, all constraints, FKs, and indexes present | 10 |
| **Phase 2 — Auth** | Register, login, bcrypt, JWT, audit log all working correctly | 10 |
| **Phase 2 — Joi Validation** | All schemas enforce correct rules, errors include Joi detail | 10 |
| **Phase 2 — Account Endpoints** | Create, list, deposit, withdraw, transfer all correct | 10 |
| **Phase 2 — SQL Quality** | JOIN, subquery, aggregate, four-table LEFT JOIN, correlated subquery all present and correct | 10 |
| **Phase 2 — MySQL Transactions** | All financial operations use beginTransaction / commit / rollback | 5 |
| **Phase 2 — Security** | No hardcoded secrets, parameterised queries throughout, passwords never plain text | 5 |
| | **Total** | **100** |

---

## 7. Submission Checklist

### Phase 1
- [ ] `design.md` submitted with all six steps completed
- [ ] ERD included in `design.md` or as a separate file
- [ ] `schema.sql` runs without errors on a clean MySQL database
- [ ] Every design decision — type choices, ON DELETE actions, index choices — has a written justification

### Phase 2
- [ ] Server starts with `node index.js` and all routes respond
- [ ] `.env` is in `.gitignore` — `.env.example` is committed
- [ ] No hardcoded secrets, no string-concatenated SQL
- [ ] Every request body validated through Joi — no manual field checks
- [ ] Joi errors return `400` with the `details` array
- [ ] Passwords hashed before insert — never returned in any response
- [ ] JWTs signed on login and verified in middleware — not stored in DB
- [ ] All financial writes use `beginTransaction / commit / rollback`
- [ ] `GET /api/accounts` uses a JOIN
- [ ] `GET /api/accounts/:account_number` uses a scalar subquery
- [ ] `GET /api/accounts/:account_number/history` uses four LEFT JOINs
- [ ] `GET /api/accounts/summary` uses GROUP BY, aggregates, and correlated subqueries
- [ ] All acceptance criteria in Section 5 verified in Postman

---

## 8. Allowed Libraries

| Package | Purpose |
|---------|---------|
| `express` | Web server and routing |
| `mysql2` | MySQL driver with Promise support |
| `joi` | Request body validation |
| `jsonwebtoken` | JWT signing and verification |
| `bcrypt` | Password hashing and comparison |
| `dotenv` | Environment variable loading |
| `uuid` | Generating transaction reference strings (optional) |

```bash
npm install express mysql2 joi jsonwebtoken bcrypt dotenv uuid
```

---

## 9. Constraints

- Do not use an ORM — write raw SQL with parameterised queries
- Do not use `passport` or any auth framework
- Do not store tokens in the database
- Do not use manual `if (!req.body.field)` checks — all body validation goes through Joi
- Do not string-concatenate user input into any SQL query
- Do not begin Phase 2 until Phase 1 has been reviewed

---

*A schema designed carefully upfront saves hours of refactoring later. The goal of Phase 1 is to think like a database engineer before thinking like an application developer.*