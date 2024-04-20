const express = require("express");
const router = express.Router();
const db = require("../models/db_connection");

router.get("/", (req, res) => {
  // SQL statement to select all forums from the 'forum' table
  const SQL =
    "SELECT forum.id, forum.post_title, forum.post_details, users.username FROM forum INNER JOIN users ON forum.user_id=users.id";

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
  const { userID, postTitle, postDetails } = req.body;

  // SQL statement to select all forums from the 'forum' table

  const SQL =
    "INSERT INTO forum (user_id, post_title, post_details) VALUES (?,?,?)";

  const Values = [userID, postTitle, postDetails];

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

//  add a comment to a post
router.post("/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { userId, commentText } = req.body;

  const SQL =
    "INSERT INTO comments (forum_id, user_id, comment_text) VALUES (?, ?, ?)";
  const values = [postId, userId, commentText];

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("Comment added successfully! %o", results);
      res
        .status(200)
        .send({ message: "Comment added successfully!", code: 200 });
    }
  });
});

// reply to a comment
router.post("/:postId/comments/:commentId/replies", (req, res) => {
  const { postId, commentId } = req.params;
  const { userId, replyText } = req.body;

  const SQL =
    "INSERT INTO replies (comment_id, user_id, reply_text) VALUES (?, ?, ?)";
  const values = [commentId, userId, replyText];

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("Reply added successfully! %o", results);
      res.status(200).send({ message: "Reply added successfully!", code: 200 });
    }
  });
});

module.exports = router;
