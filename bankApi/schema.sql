create table users (
	id int primary key auto_increment,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(100) not null unique,
	phone_number varchar(15) not null,
	password varchar(255) not null,
	is_active tinyint(1) default 1,
	created_at timestamp default current_timestamp
)

create table accounts (
	id int primary key auto_increment,
	user_id int references users(id),
	account_number varchar(20) unique not null,
	account_type varchar(20) not null check(account_type in ("savings", "current", "fixed")),
	balance decimal(15,2) default 0.00,
	currency varchar(3) not null,
	is_active tinyint(1) default 1,
	created_at timestamp default current_timestamp,
)

create table transactions (
	id int primary key auto_increment,
	source_account_id int references accounts(id),
	destination_account_id int references accounts(id),
	type varchar(20) not null check(type in ("deposit", "withdrawal", "transfer")),
	amount decimal(15,2) not null,
	description varchar(255) null,
	reference_code varchar(50) unique not null,
	status varchar(20) not null check(status in ("pending", "completed", "failed")),
	created_at timestamp default current_timestamp,
)


create table user_activity_logs (
	id int primary key,
	user_id int references users(id),
	action varchar(20) not null check(action in ("register", "login")),
	ip_address varchar(45) not null,
	created_at timestamp default current_timestamp,
)

