const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config({ path: "./.env" });
const {
  createUser,
  seeUsers,
  updateUser,
  deleteUser,
  clientSignUp,
} = require("./controllers/clientController");
const adminSignUp = require("./controllers/adminController");

const app = express();

app.use(bodyParser.json());

// IMPLIMENT OF CRUD WITH SQL QUERIES

// CREATE USERS
app.post("/createUser", createUser);

// READ USERS
app.get("/seeUsers", seeUsers);

// UPDATE USERS
app.put("/updateUser", updateUser);

// DELETE USERS
app.delete("/deleteUser", deleteUser);

// ADDING USERS INTO MASTERDB AND MAKING THEIR NEW DB

app.post("/clientSignUp", clientSignUp);

app.post("/adminSignUp", adminSignUp);


app.listen(3000, () => {
  console.log("port connected on 3000");
});
