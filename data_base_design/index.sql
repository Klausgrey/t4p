
SELECT * FROM users;
SELECT id, username, email FROM users;


SELECT * FROM users WHERE username = 'ada';

-- Ordered results
SELECT * FROM users ORDER BY created_at DESC;


SELECT * FROM users ORDER BY created_at DESC limit 10;

SELECT * FROM users ORDER BY created_at asc limit 10;


UPDATE users id
SET username = 'adachukwa'
WHERE id = 1;
delete from users where id = 1

select * from users WHERE role = 'member' limit 10

select * from users where is_active = TRUE limit 20

alter table users add column age int after email


update users set age = case id
when 2 then 23
when 3 then 14
when 4 then 67
when 5 then 29
when 6 then 45
when 7 then 30
when 8 then 43
when 9 then 13
when 10 then 70
end

select * from users WHERE age >= 18

-- Range
select * from users WHERE created_at BETWEEN '2026-01-01' AND '2026-12-31'
--
-- Multiple conditions

select * from users WHERE role = 'admin' AND is_active = true

-- Pattern matching
select * from users WHERE email LIKE '%@example.com'

-- In a set
-- WHERE tag IN ('work', 'personal')

-- NULL check
-- WHERE deleted_at IS NULL

select * from notes

select * from transactions

select * from products

SELECT COUNT(*)          FROM notes WHERE user_id = 1;
-- SELECT SUM(amount)       FROM transactions WHERE user_id = 1;
SELECT AVG(rating)       FROM reviews WHERE product_id = 5;
SELECT id, tag, MAX(created_at)   FROM notes WHERE user_id = 1 group by id, tag;
SELECT id, name, MIN(price)        FROM products WHERE category = 'electronics' group by id, name;

SELECT id, name, max(price)        FROM products WHERE category = 'electronics' group by id, name;
