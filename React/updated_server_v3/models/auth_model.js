const db = require('../models/db_connection')

const registerUser = (sentEmail, sentUserName, sentPassword, callback) => {
  // Lets create SQL statement to insert the user to the Database table Users
  const SQL = "INSERT INTO users (email, username, password) VALUES (?,?,?)";
  const Values = [sentEmail, sentUserName, sentPassword];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    // if (err) {
    //   res.send(err);
    // } else {
    //   console.log("User inserted successfully!");
    //   res.send({ message: "User added!" });
    // }
    callback(err, results)
  });
}

const loginUser = (sentloginUserName, sentLoginPassword, callback) => {
  console.log(`Username is ${sentloginUserName}`)

  // Lets create SQL statement to insert the user to the Database table Users
  const SQL = "SELECT * FROM users WHERE username = ? && password = ?";
  const Values = [sentloginUserName, sentLoginPassword];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    callback(err,results)
  });
}

module.exports = {
  registerUser,
  loginUser
}
