# SQL Data Types, Ranges, and Memory Limits

In SQL, data types are explicitly declared for columns in a table schema to ensure data integrity, optimize storage, and define the operations that can be performed on the data. While SQL is an ANSI/ISO (they are the governing bodies that created and maintain the official, universal rules for the language) standard, specific database management systems (DBMS) like PostgreSQL, MySQL, and SQLite have slight variations.

| Data Type Category | Specific Type | Typical Size | Range / Constraint Example |
| :--- | :--- | :--- | :--- |
| **Integer** | `INT` | 4 bytes | `-2.14B` to `+2.14B` |
| **Integer** | `BIGINT` | 8 bytes | `-9.22Q` to `+9.22Q` |
| **Exact Numeric** | `DECIMAL(10,2)` | Variable | Up to 10 digits total, 2 decimal places |
| **String** | `VARCHAR(255)` | Variable | Up to 255 characters |
| **Text** | `TEXT` | Variable | Large blocks of text |
| **Date/Time** | `TIMESTAMP` | 8 bytes | Date + Time combination |
| **Boolean** | `BOOLEAN` | 1 byte | `TRUE`, `FALSE`, `NULL` |