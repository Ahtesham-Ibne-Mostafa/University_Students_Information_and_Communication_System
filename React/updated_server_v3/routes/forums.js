const express = require("express")
const router = express.Router();
const db = require('../models/db_connection')

router.get("/", (req, res) => {
  // SQL statement to select all forums from the 'forum' table
  const SQL = "SELECT forum.id, forum.post_title, forum.post_details, users.username FROM forum INNER JOIN users ON forum.user_id=users.id";

  // Execute the SQL query
  db.query(SQL, (err, results) => {
    if (err) {
      // If there's an error, send the error as the response
      res.status(500).send(err);
    } else {
      // If successful, send the results as JSON response
      res.status(200).json(results);
    }
  });
});


router.post("/", (req, res) => {

  const {
    userID,
    postTitle,
    postDetails
  } = req.body;

  // SQL statement to select all forums from the 'forum' table

  const SQL =
    "INSERT INTO forum (user_id, post_title, post_details) VALUES (?,?,?)";

  const Values = [
    userID,
    postTitle,
    postDetails
  ];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Forum inserted successfully! %o", results);
      res.send({ message: "Forum added!", code: 200 });
    }
  });
});


module.exports = router
