const sqlConnection = require("../config/database");
const getPool = require("../config/clientDB");
// CRUD LOGIC HERE

// CREATE
const createUser = async (req, res) => {
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
};

// READ
const seeUsers = async (req, res) => {
  const query = `SELECT * FROM mytable`;

  sqlConnection.query(query, (err, rows, feilds) => {
    if (err) {
      console.log(err);
    } else if (rows) {
      res.status(200).json(rows);
    }
  });
};

// UPDATE
const updateUser = async (req, res) => {
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
};

// DELETE
const deleteUser = async (req, res) => {
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
};

const clientSignUp = async (req, res) => {
  const { orgName, email, username } = req.body;
  const pool = getPool(orgName);
  const query = `INSERT INTO clients (email, username) VALUES (?,?)`;
  pool.query(query, [email, username], (err, result, feilds) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else if (result) {
      res.status(200).json("user created success", result);
    }
  });
};
module.exports = { createUser, seeUsers, updateUser, deleteUser, clientSignUp };
