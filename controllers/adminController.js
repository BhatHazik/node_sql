const createDatabaseAndTableIfNotExists = require("../config/createDB");
const pool = require("../config/database");

const sendResponse = (res, status, message, rows = null) => {
  res.status(status).json({
    message,
    rows: rows || null,
  });
};

//Create
const createOrganisation = (creds) => {
  const { email, password, username, organisationName } = creds;
  console.log(username, email, password, organisationName);
  const query = `INSERT INTO myTable (username,email, password,organisationName) VALUES (?,?,?,?)`;
  pool.query(
    query,
    [username, email, password, organisationName],
    (err, rows, fields) => {
      if (err) console.log(err);
      console.log("Master DB ORG updated!");
    }
  );
};

const signup = async (req, res) => {
  const { email, password, username, organisationName } = req.body;
  const query = `SELECT EXISTS(SELECT 1 FROM clients WHERE email = '${email}') AS userExists`;

  pool.query(query, (err, rows, fields) => {
    if (rows && rows[0].userExists) {
      sendResponse(res, 403, "Organisation Exists");
    } else {
      createOrganisation({ email, password, username, organisationName });
      createDatabaseAndTableIfNotExists(email.split("@")[0]);
      const query = `INSERT INTO clients (username,email, password,organisationName) VALUES (?,?,?,?)`;
      pool.query(
        query,
        [email, password, username, organisationName],
        (err, rows, fields) => {
          res.status(200).json({
            rows,
          });
        }
      );
    }
  });
};

module.exports = signup;
