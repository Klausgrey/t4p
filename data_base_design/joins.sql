SELECT
    u.username,
    u.email,
    p.location,
    p.bio
FROM users u
INNER JOIN user_profiles p
    ON u.id = p.user_id;

select u.username, n.title, n.tag from users u join notes n on u.id  = n.user_id

select u.id, u.username, u.role, p.location, p.website
from users u
inner join user_profiles p
    on u.id = p.user_id;

select u.username, u.email, o.id as order_id, o.status, o.total
from users u
left join orders o
    on u.id = o.user_id;

select 
    o.id as order_id, u.username, p.name as product_name, oi.qty, oi.unit_price, (oi.qty * oi.unit_price) as line_total
from orders o
inner join users u 
    on o.user_id = u.id
inner join order_items oi 
    on o.id = oi.order_id
inner join products p 
    on oi.product_id = p.id
where o.status != 'cancelled';

select t.reference, t.amount, t.type, t.status, sender_user.username as sender, receiver_user.username as receiver
from transactions t
left join accounts sender_acc 
    on t.from_account = sender_acc.id
left join users sender_user 
    on sender_acc.user_id = sender_user.id
left join accounts receiver_acc 
    on t.to_account = receiver_acc.id
left join users receiver_user 
    on receiver_acc.user_id = receiver_user.id;
