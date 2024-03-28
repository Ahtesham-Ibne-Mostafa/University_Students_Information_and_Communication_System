const express = require("express")
const router = express.Router();
const db = require('../models/db_connection')

router.post("/donate-blood", (req, res) => {
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

router.get("/donors", (req, res) => {
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


module.exports = router
