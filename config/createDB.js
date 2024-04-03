const mysql = require("mysql2/promise");

async function createDatabaseAndTableIfNotExists(databaseName) {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: null,
  });

  try {
    // Check if the database exists
    const [rows] = await pool.query(
      "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
      [databaseName]
    );

    if (rows.length === 0) {
      await pool.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database '${databaseName}' created successfully.`);
    }

    // Create a connection to the specific database
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: databaseName,
    });

    const createTableQuery = `
              CREATE TABLE IF NOT EXISTS clients (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  username VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL UNIQUE
              )
          `;
    await db.query(createTableQuery);
    console.log(`Table 'clients' created successfully.`);

    await db.end();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await pool.end();
  }
}

module.exports = createDatabaseAndTableIfNotExists;
