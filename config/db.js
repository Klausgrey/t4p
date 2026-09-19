require('dotenv').config()
const mysql = require('mysql2/promise')

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const dbString = `${process.env.DB}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const dbStringConn = mysql.createPool(dbString);

const conn = async () => {
  try {
    // const conn = await db.getConnection();
    const conn = await dbStringConn.getConnection();
    console.log('db connection successful.');
    return conn
  } catch(err) {
    console.log('db connection failed.');
    console.log('error:', err?.message ?? err)
    process.exit(0)
  }
}

// module.exports.db = conn;
module.exports.db = db;
