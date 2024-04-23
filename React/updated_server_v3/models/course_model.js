const db = require('../models/db_connection')

const insertCourse = (courseCode, courseName, department, seatLimit, callback) => {
  // check whether course exist or not

  const value = [courseCode, courseName, department, seatLimit, 0];

  console.log(value);

  const insertSqlCommand = "INSERT INTO courses (courseCode, courseName, department, seatLimit, enrolledSeats) VALUES (?,?,?,?,?)";
  db.query(insertSqlCommand, value, (err, res) => {
    callback(err, res)
  });
}
const searchCourse = (courseCode, callback) => {
  const findCourseCommand = "SELECT * FROM courses WHERE courseCode = ?";
  const value = [courseCode];

  console.log(value);
  db.query(findCourseCommand, value, (err, results) => {
    callback(err, results)
  });
}

const updateCourse = (courseCode, courseName, department, seatLimit, id, callback) => {
  const SQL = "UPDATE courses SET courseCode=?,courseName=?,department=?, seatLimit=? WHERE id = ?";
  const values = [courseCode, courseName, department, seatLimit, id];

  // Execute the SQL query
  db.query(SQL, values, (err, results) => {
    callback(err, results);
  });
}

const getEnrolledCourseByID = (userID, callback) => {
  const findEnrollment = "SELECT * FROM enrollment WHERE user_id = ?";
  const value = [userID];

  db.query(findEnrollment, value, (err, results) => {
    callback(err, results)
  });
}

const findEnrolledCourseByID = (courseID, userID, callback) => {
  const findEnrolledCourse = "SELECT * FROM enrollment WHERE course_id = ? && user_id = ?";
  const values = [courseID, userID];

  db.query(findEnrolledCourse, values, (err, results) => {
    callback(err, results)
  });
}

const getEnrolledSeatsAndLimit = (courseID, callback) => {
  const enrolledSeatsSql = "SELECT enrolledSeats, seatLimit FROM courses WHERE id = ?"
  const enrolledCourseIDValue = [courseID]

  db.query(enrolledSeatsSql, enrolledCourseIDValue, (err, results) => {
    callback(err, results)
  });
}

const insertInEnrollment = (courseID, userID, callback) => {
  const values = [courseID, userID];
  const insertSqlCommand = "INSERT INTO enrollment (course_id, user_id) VALUES (?,?)";

  // Execute the SQL query
  db.query(insertSqlCommand, values, (err, results) => {
    callback(err, results)
  });
}

const updateEnrolledSeatStatus = (updatedSeat, callback) => {
  const updateCommand = "UPDATE courses SET enrolledSeats = ? ";
  const updatedSeatValue = [updatedSeat];

  db.query(updateCommand, updatedSeatValue, (err, results) => {
    callback(err, results)
  });
}

const getAllCourses = (callback) => {
  const SQL = "SELECT * FROM courses";

  // Execute the SQL query
  db.query(SQL, (err, results) => {
    callback(err, results)
  });
}

const deleteCourseByID = (id, callback) => {
  const SQL = "DELETE enrollment, courses FROM enrollment LEFT JOIN courses ON enrollment.course_id = courses.id WHERE enrollment.course_id = ?";
  const values = [id];
  db.query(SQL, values, (err, results) => {
    callback(err, results)
  });
}




module.exports = {
  searchCourse,
  insertCourse,
  updateCourse,
  getEnrolledCourseByID,
  findEnrolledCourseByID,
  getEnrolledSeatsAndLimit,
  insertInEnrollment,
  updateEnrolledSeatStatus,
  getAllCourses,
  deleteCourseByID,
}
