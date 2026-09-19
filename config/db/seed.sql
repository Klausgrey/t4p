-- Active: 1789638400427@@127.0.0.1@3306@mysql

CREATE TABLE IF NOT EXISTS app_users (
    id varchar(36) PRIMARY KEY,
    username varchar(100) UNIQUE,
    email varchar(100) UNIQUE,
    password varchar(100),
    phone_number varchar(100)
);

INSERT INTO app_users VALUES ('SGBVHHJS', 'HJVCJ', 'HJBAFJHBSDF', 'JHSABVJHFD', 'JHVASJ');

SELECT * FROM app_users;

TRUNCATE TABLE app_users;
