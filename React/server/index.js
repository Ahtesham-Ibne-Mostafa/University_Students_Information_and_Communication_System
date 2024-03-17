// Our Dependecies
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Let us run the server. So its running
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

// Let us create our database (mysql)
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "", //If you have set xampp password please enter it here
  database: "usicsdb",
});

// let us now create a route to the server that will register a user

app.post("/register", (req, res) => {
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

app.post("/login", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

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

app.post("/donate-blood", (req, res) => {
  // const sentloginUserName = req.body.LoginUserName
  // const sentLoginPassword = req.body.LoginPassword
  const requestFullName = req.body.fullName;
  const requestBloodGroup = req.body.bloodGroup;
  const requestStudentID = req.body.studentID;
  const requestContactNo = req.body.contactNo;
  const requestEmail = req.body.emailAddress;
  const requestHouseAddress = req.body.address;

  // Lets create SQL statement to insert the donors to the Database table Donation
  const SQL =
    "INSERT INTO donation (name, blood_group, student_id, contact_no, email_address, house_address) VALUES (?,?,?,?,?,?)";
  const Values = [
    requestFullName,
    requestBloodGroup,
    requestStudentID,
    requestContactNo,
    requestEmail,
    requestHouseAddress,
  ];

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log(`Donor inserted successfully! ${results}`);
      res.send({ message: "Donor added!", code: 200 });
    }
  });
});

app.get("/donors", (req, res) => {
  // SQL statement to select all donors from the 'donation' table
  const SQL = "SELECT * FROM donation";

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

// Route to add or change seat limit for a course
app.post("/courses/seatLimit", (req, res) => {
  const { courseCode, newSeatLimit } = req.body;

  // SQL statement to update the seat limit for a course based on its course code
  const SQL = "UPDATE courses SET seat_limit = ? WHERE course_code = ?";
  const values = [newSeatLimit, courseCode];

  // Execute the SQL query
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Error updating seat limit:", err);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(200).send({ message: "Seat limit updated successfully" });
    }
  });
});

// Route to get all courses with their seat limits
app.get("/courses", (req, res) => {
  // SQL statement to select all courses with their seat limits
  const SQL =
    "SELECT courseCode, courseName, department, seatLimit FROM courses";

  // Execute the SQL query
  db.query(SQL, (err, results) => {
    if (err) {
      console.error("Error fetching courses:", err);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});
