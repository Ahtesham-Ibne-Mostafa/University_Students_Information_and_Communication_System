const express = require("express")
const router = express.Router();
const db = require('../models/db_connection')

// const mysql = require("mysql")
// const db = mysql.createConnection({
//     user: "root",
//     host: "192.168.31.217",
//     password: "", //If you have set xampp password please enter it here
//     database: "usicsdb",
// });
//
// if (db) {
//     console.log("DB CONNECTED")
// } else {
//     console.log("Failed to connect")
// }

router.post("/register", (req, res) => {
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  // Lets create SQL statement to insert the user to the Database table Users
  const SQL = "INSERT INTO users (email, username, password) VALUES (?,?,?)";
  const Values = [sentEmail, sentUserName, sentPassword];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("User inserted successfully!");
      res.send({ message: "User added!" });
    }
  });
});

router.post("/login", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  console.log(`Username is ${sentloginUserName}`)

  // Lets create SQL statement to insert the user to the Database table Users
  const SQL = "SELECT * FROM users WHERE username = ? && password = ?";
  const Values = [sentloginUserName, sentLoginPassword];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: `Credentials Don't match!` });
    }
  });
});

module.exports = router
