# Bank Account API — Design Document

## Step 1: entities identification
1. **users**
2. **accounts**
3. **transactions**
4. **user_activity_logs**

## Step 2: entities attributes
### 1. users
- id int, primary key
- first_name varchar(50) not null
- last_name varchar(50) not null
- email varchar(255) unique not null
- phone_number varchar(20) unique not null
- password varchar(255) not null
- is_active tinyint(1) default 1
- created_at timestamp default current_timestamp

### 2. accounts
- id int, primary key
- user_id int, foreign key references users(id)
- account_number varchar(20) unique not null
- account_type enum("savings", "current", "fixed")
- balance decimal(15,2) default 0.00
- currency varchar(3) not null
- is_active tinyint(1) default 1
- created_at timestamp default current_timestamp

---
**note**:
- for balance, i use decimal(15,2) and not float because float cannot represent some values accurately, which can lead to rounding. so decimal is preferred for financial applications.

### 3. transactions
- id int, primary key
- source_account_id int, foreign key references accounts(id) used for withdrawals and transfers nulla
- destination_account_id int, foreign key references accounts(id) used for deposits and transfers
- type enum("deposit", "withdrawal", "transfer") not null
- amount decimal(15,2) not null
- description varchar(255) null
- reference_code varchar(50) unique not null
- status enum ("pending", "completed", "failed") not null
- created_at timestamp default current_timestamp

### 4. user_activity_logs
- id int, primary key
- user_id int, foreign key references users(id)
- action enum("register", "login") not null
- ip_address varchar(45) not null
- created_at timestamp default current_timestamp

## Step 4: Entity-Relationship Diagram

ERD created in dbdiagram.io (crow's foot notation): [View ERD](https://dbdiagram.io/d/bankapi-relationship-mapping-6ab624e8586942561290e1f3)
**notes**:
- transactions having two FKs to the same table (accounts) which is a valid design pattern for representing transfers between accounts.