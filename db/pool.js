const { Pool } = require("pg");

module.exports = new Pool({
  ssl: { rejectUnauthorized: false },
  connectionString: process.env.CONNECTION_STRING,
});
