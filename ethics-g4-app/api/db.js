const { Pool } = require("pg");
require("dotenv").config();

// const DATABASE_NAME = "ethics";
// const DATABASE_HOST = "localhost";
// const DATABASE_USER = "root";
// const DATABASE_PASSWORD = "rootpassword";

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  port: 5432,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

module.exports = pool;
