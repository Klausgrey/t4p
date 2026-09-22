SELECT
    u.username,
    u.email,
    p.location,
    p.bio
FROM users u
INNER JOIN user_profiles p
    ON u.id = p.user_id;

select u.username, n.title, n.tag from users u join notes n on u.id  = n.user_id

