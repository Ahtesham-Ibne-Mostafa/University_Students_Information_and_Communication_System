const db = require('../models/db_connection')

const insertDonation = (
  requestFullName,
  requestBloodGroup,
  requestStudentID,
  requestContactNo,
  requestEmail,
  requestHouseAddress,
  callback
) => {
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
    callback(err, results);

  });
}

const getDonors = (callback) => {
  const SQL = "SELECT * FROM donation";

  // Execute the SQL query
  db.query(SQL, (err, results) => {
    callback(err, results);
  });
}

module.exports = {
  insertDonation,
  getDonors
}
