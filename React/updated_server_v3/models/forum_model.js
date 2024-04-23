const db = require("../models/db_connection");

const getForums = (callback) => {
  const SQL =
    "SELECT forum.id, forum.post_title, forum.post_details, users.username FROM forum INNER JOIN users ON forum.user_id=users.id";

  // Execute the SQL query
  db.query(SQL, (err, results) => {
    callback(err, results)
  });
}

const addForum = (userID, postTitle, postDetails, callback) => {
  const SQL =
    "INSERT INTO forum (user_id, post_title, post_details) VALUES (?,?,?)";

  const Values = [userID, postTitle, postDetails];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    callback(err, results);
  });
}

const addComment = (postId, userId, commentText, callback) => {

  const SQL =
    "INSERT INTO comments (forum_id, user_id, comment_text) VALUES (?, ?, ?)";
  const values = [postId, userId, commentText];

  db.query(SQL, values, (err, results) => {
    callback(err, results);

  });
}

const addReplies = (commentId, userId, replyText, callback) => {
  const SQL =
    "INSERT INTO replies (comment_id, user_id, reply_text) VALUES (?, ?, ?)";
  const values = [commentId, userId, replyText];

  db.query(SQL, values, (err, results) => {
    callback(err, results);
  });
}

module.exports = {
  getForums,
  addForum,
  addComment,
  addReplies
}
