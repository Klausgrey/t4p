CREATE TABLE users (
 id int AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(100) UNIQUE NOT NULL,
 email VARCHAR(255) UNIQUE NOT NULL,
 password TEXT NOT NULL,
 role VARCHAR(20) NOT NULL DEFAULT 'member'
 CHECK (role IN ('admin', 'member', 'moderator')),
 is_active BOOLEAN NOT NULL DEFAULT TRUE,
 created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO users (username, email, password, role, is_active, created_at) VALUES
('ada', 'ada@example.com', '$2b$10$hash_ada', 'admin', TRUE, '2026-01-10 08:00:00'),
('kofi', 'kofi@example.com', '$2b$10$hash_kofi', 'member', TRUE, '2026-01-12 09:15:00'),
('ngozi', 'ngozi@example.com', '$2b$10$hash_ngozi', 'member', TRUE, '2026-01-14 11:30:00'),
('tolu', 'tolu@example.com', '$2b$10$hash_tolu', 'moderator', TRUE, '2026-01-16 13:45:00'),
('chidi', 'chidi@example.com', '$2b$10$hash_chidi', 'member', TRUE, '2026-01-18 07:20:00'),
('amara', 'amara@example.com', '$2b$10$hash_amara', 'member', FALSE, '2026-01-20 10:00:00'),
('emeka', 'emeka@example.com', '$2b$10$hash_emeka', 'member', TRUE, '2026-02-01 14:00:00'),
('priya', 'priya@example.com', '$2b$10$hash_priya', 'member', TRUE, '2026-02-05 09:00:00'),
('lars', 'lars@example.com', '$2b$10$hash_lars', 'member', TRUE, '2026-02-10 11:00:00'),
('fatima', 'fatima@example.com', '$2b$10$hash_fatima', 'admin', TRUE, '2026-02-15 08:30:00');


CREATE TABLE user_profiles (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
 bio TEXT,
 avatar_url VARCHAR(500),
 location VARCHAR(150),
 website VARCHAR(255),
 updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO user_profiles (user_id, bio, avatar_url, location, website, updated_at) VALUES
(1, 'Backend engineer and bootcamp lead. Passionate about clean architecture.', 'https://cdn.example.com/avatars/ada.jpg', 'Lagos, Nigeria', 'https://ada.dev', '2026-01-11 10:00:00'),
(2, 'Full-stack developer learning everything from scratch.', 'https://cdn.example.com/avatars/kofi.jpg', 'Accra, Ghana', NULL, '2026-01-13 09:00:00'),
(3, 'Product-focused engineer. Loves databases and distributed systems.', 'https://cdn.example.com/avatars/ngozi.jpg', 'Abuja, Nigeria', 'https://ngozi.io', '2026-01-15 12:00:00'),
(4, 'Community moderator and open-source contributor.', 'https://cdn.example.com/avatars/tolu.jpg', 'Ibadan, Nigeria', NULL, '2026-01-17 08:00:00'),
(5, 'Junior developer focused on APIs and backend engineering.', 'https://cdn.example.com/avatars/chidi.jpg', 'Enugu, Nigeria', NULL, '2026-01-19 07:30:00'),
(6, 'Currently on a break.', NULL, 'Kano, Nigeria', NULL, '2026-01-21 10:00:00'),
(7, 'DevOps-curious backend engineer.', 'https://cdn.example.com/avatars/emeka.jpg', 'Lagos, Nigeria', 'https://emeka.tech', '2026-02-02 14:30:00'),
(8, 'Data engineering and ML pipeline specialist.', 'https://cdn.example.com/avatars/priya.jpg', 'Bangalore, India', 'https://priya.ml', '2026-02-06 09:30:00'),
(9, 'Systems programmer. Enthusiast of Rust and PostgreSQL.', 'https://cdn.example.com/avatars/lars.jpg', 'Stockholm, Sweden', 'https://lars.codes', '2026-02-11 11:30:00'),
(10,'Platform admin and security-focused engineer.', 'https://cdn.example.com/avatars/fatima.jpg', 'Nairobi, Kenya', 'https://fatima.io', '2026-02-16 09:00:00');


CREATE TABLE notes (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 title VARCHAR(255) NOT NULL,
 body TEXT NOT NULL,
 tag VARCHAR(20) NOT NULL DEFAULT 'personal'
 CHECK (tag IN ('personal', 'work', 'other')),
 is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
 created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (user_id, title, body, tag, is_pinned, created_at) VALUES
(1, 'Bootcamp kickoff checklist', 'Set up repo, write syllabus, share Notion with students.', 'work', TRUE, '2026-01-11 08:30:00'),
(1, 'Week 1 feedback', 'Students struggled with scope. Revisit closures next session.', 'work', FALSE, '2026-01-18 18:00:00'),
(1, 'Read list', 'DDIA, Clean Code, Designing Data-Intensive Applications.', 'personal', FALSE, '2026-01-20 20:00:00'),
(2, 'JS arrow functions recap', 'Arrow functions do not have their own `this`. Review MDN.', 'work', TRUE, '2026-01-13 10:00:00'),
(2, 'Grocery list', 'Rice, beans, eggs, tomatoes, pepper, onions.', 'personal', FALSE, '2026-01-14 07:00:00'),
(2, 'Side project ideas', 'Build a CLI budget tracker. Use Node.js and JSON file storage.', 'other', FALSE, '2026-01-15 21:00:00'),
(3, 'PostgreSQL indexing notes', 'B-tree indexes for equality; GiST for full-text; BRIN for ranges.', 'work', TRUE, '2026-01-15 09:00:00'),
(3, 'Gym schedule', 'Mon: chest. Wed: back. Fri: legs. Weekend: rest.', 'personal', FALSE, '2026-01-16 06:30:00'),
(4, 'Community guidelines draft', 'Be respectful. No spam. Flag rule violations to moderators.', 'work', TRUE, '2026-01-17 11:00:00'),
(5, 'HTTP status codes', '200 OK, 201 Created, 400 Bad Request, 401, 403, 404, 500.', 'work', FALSE, '2026-01-19 09:00:00'),
(5, 'JWT vs sessions comparison', 'JWTs are stateless; sessions need server-side storage.', 'work', FALSE, '2026-01-21 10:00:00'),
(7, 'Docker commands reference', 'docker ps, docker build, docker-compose up -d, docker logs.', 'work', FALSE, '2026-02-02 15:00:00'),
(7, 'Weekend plan', 'Visit the art gallery. Cook jollof. Study Kubernetes basics.', 'personal', FALSE, '2026-02-03 19:00:00'),
(8, 'ML pipeline stages', 'Ingest → Clean → Feature eng → Train → Evaluate → Deploy.', 'work', TRUE, '2026-02-06 10:00:00'),
(9, 'Rust ownership model', 'Each value has one owner. When owner goes out of scope, dropped.', 'work', FALSE, '2026-02-11 12:00:00'),
(9, 'Hiking trip', 'Prepare boots, water, snacks. Route: southern trail 12km.', 'personal', FALSE, '2026-02-12 07:00:00'),
(10,'Security audit checklist', 'Check JWT expiry, rate limiting, CORS headers, SQL injection.', 'work', TRUE, '2026-02-16 10:00:00'),
(1, 'Normalisation worksheet', 'Draft 1NF, 2NF, 3NF examples using the student-course schema.', 'work', FALSE, '2026-03-01 09:00:00'),
(2, 'Promise chain vs async/await', 'Prefer async/await for readability. Both compile to microtasks.', 'work', FALSE, '2026-03-02 11:00:00'),
(3, 'Conference notes', 'Key talk: distributed transactions. CAP theorem revisited.', 'other', FALSE, '2026-03-05 17:00:00');


CREATE TABLE students (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 email VARCHAR(255) UNIQUE NOT NULL,
 cohort VARCHAR(20) NOT NULL,
 enrolled_at DATE NOT NULL DEFAULT (CURRENT_DATE)
);


INSERT INTO students (name, email, cohort, enrolled_at) VALUES
('Adaeze Okonkwo', 'adaeze@students.example.com', 'Cohort-1', '2026-01-10'),
('Kofi Mensah', 'kofi.m@students.example.com', 'Cohort-1', '2026-01-10'),
('Ngozi Eze', 'ngozi.e@students.example.com', 'Cohort-1', '2026-01-10'),
('Tolu Adesanya', 'tolu.a@students.example.com', 'Cohort-1', '2026-01-10'),
('Chidi Obi', 'chidi.o@students.example.com', 'Cohort-1', '2026-01-10'),
('Amara Nwosu', 'amara.n@students.example.com', 'Cohort-2', '2026-04-07'),
('Emeka Ike', 'emeka.i@students.example.com', 'Cohort-2', '2026-04-07'),
('Priya Sharma', 'priya.s@students.example.com', 'Cohort-2', '2026-04-07'),
('Lars Eriksson', 'lars.e@students.example.com', 'Cohort-2', '2026-04-07'),
('Fatima Musa', 'fatima.m@students.example.com','Cohort-2', '2026-04-07');


CREATE TABLE courses (
 id INT AUTO_INCREMENT PRIMARY KEY,
 code VARCHAR(20) UNIQUE NOT NULL,
 title VARCHAR(255) NOT NULL,
 description TEXT,
 duration_weeks INT NOT NULL CHECK (duration_weeks > 0),
 is_active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO courses (code, title, description, duration_weeks, is_active) VALUES
('BE-101', 'Backend Fundamentals', 'Intro to servers, HTTP, and terminal basics.', 2, TRUE),
('BE-102', 'Python for Backend', 'Variables, control flow, functions, OOP, and modules in Python.', 4, TRUE),
('BE-103', 'JavaScript for Backend', 'JS syntax, async/await, Promises, and Node.js foundations.', 4, TRUE),
('BE-104', 'Web Frameworks', 'Express.js routing, middleware, and REST API design.', 3, TRUE),
('BE-105', 'Authentication & Security', 'JWT, bcrypt, dotenv, HTTPS, and OWASP top 10.', 2, TRUE),
('BE-106', 'Database Design', 'RDBMS, SQL, normalisation, indexing, and intro to NoSQL.', 3, TRUE),
('BE-107', 'API Design & Testing', 'REST principles, Postman, request validation, and error handling.', 2, TRUE),
('BE-108', 'DevOps Basics', 'Git workflows, Docker, CI/CD pipelines, and deployment strategies.', 2, FALSE);

CREATE TABLE enrollments (
 student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
 course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
 enrolled_at TIMESTAMP NOT NULL DEFAULT NOW(),
 grade DECIMAL(5,2) CHECK (grade >= 0 AND grade <= 100),
 completed BOOLEAN NOT NULL DEFAULT FALSE,
 PRIMARY KEY (student_id, course_id)
);

INSERT INTO enrollments (student_id, course_id, enrolled_at, grade, completed) VALUES
-- Student 1: Ada — completed most courses
(1, 1, '2026-01-10 09:00:00', 95.00, TRUE),
(1, 2, '2026-01-10 09:00:00', 88.50, TRUE),
(1, 3, '2026-01-10 09:00:00', 91.00, TRUE),
(1, 4, '2026-01-10 09:00:00', 87.00, TRUE),
(1, 5, '2026-01-10 09:00:00', 93.00, TRUE),
(1, 6, '2026-01-10 09:00:00', NULL, FALSE),
-- Student 2: Kofi
(2, 1, '2026-01-10 09:00:00', 78.00, TRUE),
(2, 2, '2026-01-10 09:00:00', 82.50, TRUE),
(2, 3, '2026-01-10 09:00:00', 74.00, TRUE),
(2, 4, '2026-01-10 09:00:00', NULL, FALSE),
-- Student 3: Ngozi
(3, 1, '2026-01-10 09:00:00', 90.00, TRUE),
(3, 2, '2026-01-10 09:00:00', 85.00, TRUE),
(3, 3, '2026-01-10 09:00:00', 88.00, TRUE),
(3, 4, '2026-01-10 09:00:00', 92.00, TRUE),
(3, 6, '2026-01-10 09:00:00', NULL, FALSE),
-- Student 4: Tolu
(4, 1, '2026-01-10 09:00:00', 72.00, TRUE),
(4, 2, '2026-01-10 09:00:00', 65.00, TRUE),
(4, 3, '2026-01-10 09:00:00', NULL, FALSE),
-- Student 5: Chidi
(5, 1, '2026-01-10 09:00:00', 68.00, TRUE),
(5, 2, '2026-01-10 09:00:00', 71.00, TRUE),
(5, 3, '2026-01-10 09:00:00', 79.00, TRUE),
(5, 4, '2026-01-10 09:00:00', NULL, FALSE),
-- Cohort 2 students
(6, 1, '2026-04-07 09:00:00', NULL, FALSE),
(6, 3, '2026-04-07 09:00:00', NULL, FALSE),
(7, 1, '2026-04-07 09:00:00', NULL, FALSE),
(7, 3, '2026-04-07 09:00:00', NULL, FALSE),
(8, 1, '2026-04-07 09:00:00', NULL, FALSE),
(9, 1, '2026-04-07 09:00:00', NULL, FALSE),
(10,1, '2026-04-07 09:00:00', NULL, FALSE);


CREATE TABLE orders (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL REFERENCES users(id),
 status VARCHAR(20) NOT NULL DEFAULT 'pending'
 CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
 total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
 notes TEXT,
 created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO orders (user_id, status, total, notes, created_at) VALUES
(2, 'delivered', 85.00, NULL, '2026-02-01 10:00:00'),
(2, 'delivered', 124.99, 'Please leave at the door.', '2026-02-15 11:00:00'),
(3, 'shipped', 81.99, NULL, '2026-03-01 09:00:00'),
(5, 'confirmed', 120.00, NULL, '2026-03-10 14:00:00'),
(7, 'delivered', 97.50, 'Fragile items — handle care.','2026-03-12 08:00:00'),
(7, 'pending', 39.99, NULL, '2026-04-01 10:00:00'),
(8, 'delivered', 165.00, NULL, '2026-04-05 09:00:00'),
(9, 'cancelled', 45.00, 'Changed my mind.', '2026-04-08 10:00:00'),
(1, 'confirmed', 153.00, NULL, '2026-04-10 11:00:00'),
(3, 'pending', 12.00, NULL, '2026-04-15 13:00:00');


CREATE TABLE products (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 description TEXT,
 price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
 stock_qty INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
 category VARCHAR(100) NOT NULL,
 is_active BOOLEAN NOT NULL DEFAULT TRUE,
 created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, description, price, stock_qty, category, is_active, created_at) VALUES
('Mechanical Keyboard', 'Tenkeyless, tactile switches, RGB backlight.', 85.00, 45, 'Electronics', TRUE, '2026-01-05 10:00:00'),
('USB-C Hub (7-in-1)', '4K HDMI, 3x USB-A, SD card reader, PD charging port.', 39.99, 120, 'Electronics', TRUE, '2026-01-05 10:00:00'),
('Desk Lamp with USB Port', 'LED, 3 brightness levels, integrated USB-A charging.', 24.50, 80, 'Electronics', TRUE, '2026-01-06 11:00:00'),
('Ergonomic Mouse', 'Vertical design, 6 programmable buttons, 2.4GHz wireless.', 49.00, 60, 'Electronics', TRUE, '2026-01-07 09:00:00'),
('Noise-Cancelling Headset', 'Over-ear, 30h battery, USB-C and 3.5mm jack.', 120.00, 30, 'Electronics', TRUE, '2026-01-08 10:00:00'),
('Developer Notebook A5', '200 pages, dot-grid, lay-flat binding.', 12.00, 200, 'Stationery', TRUE, '2026-01-09 08:00:00'),
('Whiteboard Markers (8pk)', 'Assorted colours, fine and chisel tip.', 8.50, 300, 'Stationery', TRUE, '2026-01-09 08:00:00'),
('Laptop Stand (Aluminium)', 'Adjustable, 6 angles, folds flat for travel.', 32.00, 75, 'Accessories', TRUE, '2026-01-10 10:00:00'),
('Monitor Privacy Filter', '24-inch, blocks side-angle viewing.', 45.00, 40, 'Accessories', TRUE, '2026-01-11 09:00:00'),
('Cable Management Kit', '50 velcro ties, 10 cable clips, 2 cable boxes.', 15.00, 150, 'Accessories', TRUE, '2026-01-12 09:00:00'),
('Mechanical Pencil Set', '3 pencils, 0.5mm, with spare leads.', 9.00, 250, 'Stationery', TRUE, '2026-01-13 09:00:00'),
('Desk Mat XL', '90x40cm, stitched edges, non-slip base.', 28.00, 90, 'Accessories', FALSE, '2026-01-14 10:00:00');



CREATE TABLE order_items (
 id INT AUTO_INCREMENT PRIMARY KEY,
 order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 product_id INT NOT NULL REFERENCES products(id),
 qty INT NOT NULL CHECK (qty > 0),
 unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0)
);

INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES
-- Order 1: Kofi buys a keyboard
(1, 1, 1, 85.00),
-- Order 2: Kofi buys hub + lamp
(2, 2, 1, 39.99),
(2, 3, 1, 24.50),
(2, 6, 5, 12.00),
-- Order 3: Ngozi buys mouse + markers
(3, 4, 1, 49.00),
(3, 7, 1, 8.50),
(3, 11, 1, 9.00),
(3, 10, 1, 15.00),
-- Order 4: Chidi buys headset
(4, 5, 1, 120.00),
-- Order 5: Emeka buys stand + markers + cable kit
(5, 8, 1, 32.00),
(5, 7, 2, 8.50),
(5, 10, 1, 15.00),
(5, 6, 4, 12.00),
-- Order 6: Emeka buys hub
(6, 2, 1, 39.99),
-- Order 7: Priya buys headset + stand
(7, 5, 1, 120.00),
(7, 8, 1, 32.00),
(7, 6, 1, 12.00),
-- Order 8: Lars buys monitor filter (then cancels)
(8, 9, 1, 45.00),
-- Order 9: Ada buys keyboard + mouse + lamp
(9, 1, 1, 85.00),
(9, 4, 1, 49.00),
(9, 3, 1, 24.50),
-- Order 10: Ngozi buys notebook
(10, 6, 1, 12.00);


CREATE TABLE order_items (
 id INT AUTO_INCREMENT PRIMARY KEY,
 order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 product_id INT NOT NULL REFERENCES products(id),
 qty INT NOT NULL CHECK (qty > 0),
 unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0)
);

INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES
-- Order 1: Kofi buys a keyboard
(1, 1, 1, 85.00),
-- Order 2: Kofi buys hub + lamp
(2, 2, 1, 39.99),
(2, 3, 1, 24.50),
(2, 6, 5, 12.00),
-- Order 3: Ngozi buys mouse + markers
(3, 4, 1, 49.00),
(3, 7, 1, 8.50),
(3, 11, 1, 9.00),
(3, 10, 1, 15.00),
-- Order 4: Chidi buys headset
(4, 5, 1, 120.00),
-- Order 5: Emeka buys stand + markers + cable kit
(5, 8, 1, 32.00),
(5, 7, 2, 8.50),
(5, 10, 1, 15.00),
(5, 6, 4, 12.00),
-- Order 6: Emeka buys hub
(6, 2, 1, 39.99),
-- Order 7: Priya buys headset + stand
(7, 5, 1, 120.00),
(7, 8, 1, 32.00),
(7, 6, 1, 12.00),
-- Order 8: Lars buys monitor filter (then cancels)
(8, 9, 1, 45.00),
-- Order 9: Ada buys keyboard + mouse + lamp
(9, 1, 1, 85.00),
(9, 4, 1, 49.00),
(9, 3, 1, 24.50),
-- Order 10: Ngozi buys notebook
(10, 6, 1, 12.00);



CREATE TABLE accounts (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
 balance DECIMAL(12,2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
 currency CHAR(3) NOT NULL DEFAULT 'NGN',
 updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO accounts (user_id, balance, currency, updated_at) VALUES
(1, 150000.00, 'NGN', '2026-04-10 11:00:00'),
(2, 42500.75, 'NGN', '2026-04-08 09:00:00'),
(3, 88000.00, 'NGN', '2026-04-09 14:00:00'),
(4, 31000.50, 'NGN', '2026-04-07 10:00:00'),
(5, 15200.00, 'NGN', '2026-04-06 08:30:00'),
(6, 0.00, 'NGN', '2026-01-21 10:00:00'),
(7, 67800.00, 'NGN', '2026-04-12 12:00:00'),
(8, 210000.00, 'USD', '2026-04-11 09:00:00'),
(9, 95000.00, 'SEK', '2026-04-10 15:00:00'),
(10, 500000.00, 'NGN', '2026-04-13 08:00:00');



CREATE TABLE transactions (
 id INT AUTO_INCREMENT PRIMARY KEY,
 from_account INT REFERENCES accounts(id),
 to_account INT REFERENCES accounts(id),
 amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
 type VARCHAR(20) NOT NULL CHECK (type IN ('transfer', 'deposit', 'withdrawal')),
 status VARCHAR(20) NOT NULL DEFAULT 'completed'
 CHECK (status IN ('completed', 'failed', 'pending')),
 reference VARCHAR(100) UNIQUE NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO transactions (from_account, to_account, amount, type, status, reference, created_at) VALUES
(2, 1, 5000.00, 'transfer', 'completed', 'TXN-20260301-001', '2026-03-01 10:05:00'),
(3, 7, 12000.00, 'transfer', 'completed', 'TXN-20260310-002', '2026-03-10 14:10:00'),
(NULL, 2, 20000.00, 'deposit', 'completed', 'TXN-20260315-003', '2026-03-15 09:00:00'),
(5, NULL, 3000.00, 'withdrawal','completed', 'TXN-20260318-004', '2026-03-18 11:00:00'),
(1, 5, 8000.00, 'transfer', 'completed', 'TXN-20260320-005', '2026-03-20 13:00:00'),
(7, 3, 4500.00, 'transfer', 'completed', 'TXN-20260325-006', '2026-03-25 15:00:00'),
(2, 4, 1500.00, 'transfer', 'failed', 'TXN-20260401-007', '2026-04-01 10:00:00'),
(NULL,10,50000.00, 'deposit', 'completed', 'TXN-20260405-008', '2026-04-05 08:00:00'),
(10, 1, 25000.00, 'transfer', 'completed', 'TXN-20260410-009', '2026-04-10 11:00:00'),
(3, NULL, 5000.00,'withdrawal', 'pending', 'TXN-20260415-010', '2026-04-15 09:00:00');



CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_transactions_from ON transactions(from_account);
CREATE INDEX idx_transactions_to ON transactions(to_account);

-- Frequently filtered columns
CREATE INDEX idx_notes_tag ON notes(tag);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);

-- Composite index (Section 9 example)
CREATE INDEX idx_notes_user_tag ON notes(user_id, tag);
