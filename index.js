const express = require("express");
const bodyParser = require("body-parser");
const sqlConnection = require("./connection");

const app = express();

app.use(bodyParser.json());

app.get("/createTable", (req, res) => {
  const tableName = req.body;
  sqlConnection.query(
    `CREATE TABLE ${tableName}(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
)`,
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
      }
    }
  );
});

// IMPLIMENT OF CRUD WITH SQL QUERIES

// CREATE USERS
app.post("/createUser", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  if (username !== "" && email !== "" && password !== "") {
    const query = `INSERT INTO mytable (username,email, password) VALUES (?,?,?)`;
    sqlConnection.query(
      query,
      [username, email, password],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({
          rows,
        });
      }
    );
  }
});

// READ USERS
app.get("/seeUsers", (req, res) => {
  const query = `SELECT * FROM mytable`;

  sqlConnection.query(query, (err, rows, feilds) => {
    if (err) {
      console.log(err);
    } else if (rows) {
      res.status(200).json(rows);
    }
  });
});

// UPDATE USERS
app.put("/updateUser", (req, res) => {
  const { newUsername, newEmail, oldEmail } = req.body;
  const query = `UPDATE mytable SET username = ?, email = ? WHERE email = ?`;
  sqlConnection.query(
    query,
    [newUsername, newEmail, oldEmail],
    (err, result, fields) => {
      if (err) {
        res.status(400).json(err);
      } else if (result) {
        res.status(200).json(result);
      }
    }
  );
});

// DELETE USERS
app.delete("/deleteUser", (req, res) => {
  const { email } = req.body;
  const query = `DELETE FROM mytable WHERE email = ?`;
  sqlConnection.query(query, [email], (err, result, fields) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
    } else if (result && result.affectedRows > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

app.listen(3000, () => {
  console.log("port connected on 3000");
});
