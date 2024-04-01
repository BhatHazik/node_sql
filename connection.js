const SQL = require("mysql2");
const sqlConnection = SQL.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_db",
});

module.exports = sqlConnection;
