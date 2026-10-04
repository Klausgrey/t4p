-- Active: 1791056336540@@127.0.0.1@3306@mysql
create database bankapi;
use bankapi;
drop database bankapi

create table users (
	id varchar(36) primary key,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
	email varchar(100) not null unique,
	phoneNumber varchar(15) not null,
	password varchar(255) not null,
	isActive tinyint(1) default 1,
	createdAt timestamp default current_timestamp
)


create table accounts (
	id varchar(36) primary key,
	userId varchar(36) not null,
	accountNumber varchar(20) unique not null,
	accountType varchar(20) not null check(accountType in ('savings', 'current', 'fixed')),
	balance decimal(15,2) default 0.00,
	currency varchar(3) not null,
	isActive tinyint(1) default 1,
	createdAt timestamp default current_timestamp,
	foreign key (userId) references users(id)
)

create table transactions (
	id int auto_increment primary key,
	sourceAccountId varchar(36),
	destinationAccountId varchar(36),
	type varchar(20) not null check(type in ('deposit', 'withdrawal', 'transfer')),
	amount decimal(15,2) not null,
	description varchar(255) null,
	referenceCode varchar(50) unique not null,
	status varchar(20) not null check(status in ('pending', 'completed', 'failed')),
	createdAt timestamp default current_timestamp,
	foreign key (sourceAccountId) references accounts(id),
	foreign key (destinationAccountId) references accounts(id)
)


create table user_activity_logs (
	id int auto_increment primary key,
	userId varchar(36) not null,
	action varchar(20) not null check(action in ('register', 'login')),
	ipAddress varchar(45) not null,
	createdAt timestamp default current_timestamp,
	foreign key (userId) references users(id)
)
