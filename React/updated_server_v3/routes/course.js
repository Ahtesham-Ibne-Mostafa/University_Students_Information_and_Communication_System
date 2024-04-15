const express = require("express")
const router = express.Router();
const db = require('../models/db_connection')

// Add course
router.post("/", (req, res) => {

  const { courseCode, courseName, department, seatLimit } = req.body;

  // check whether course exist or not

  const findCourseCommand = "SELECT * FROM courses WHERE courseCode = ?";
  const value = [courseCode, courseName, department, seatLimit, 0];

  console.log(value);
  db.query(findCourseCommand, value, (err, results) => {
    if (err) {
      console.log(`Error with db execution ${err}`);
      res.status(500).send({
        "message": "Error occurred",
        "error": true,
      });
    }
    if (results.length > 0) {
      // exists 
      res.status(200).send({
        "message": "Course already exists",
        "error": true,
      });
    } else {
      // add course
      const insertSqlCommand = "INSERT INTO courses (courseCode, courseName, department, seatLimit, enrolledSeats) VALUES (?,?,?,?,?)";
      db.query(insertSqlCommand, value, (insertError, _insertResult) => {
        if (insertError) {
          console.log("Failed to insert data to db");
          console.log(value);
          res.status(500).send({
            "message": "Failed to add data",
            "error": true,
          });
        }
        res.status(200).send(
          {
            "message": "Added successfully",
            "error": false,
          }
        );
      });


    }
  });
});

router.get("/", (req, res) => {

  const SQL = "SELECT * FROM courses";

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

// delete course
router.delete("/", (req, res) => {

  const { id } = req.body;
  console.log(`Remove course ${id}`);


  const SQL = "DELETE FROM courses WHERE id = ?";
  const values = [id];
  db.query(SQL, values, (err, _results) => {
    if (err) {
      // console.error("Error removing courses", err);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(200).send({ message: "Course removed successfully" });
    }
  });
});


// Route to add or change seat limit for a course
router.post("/seatLimit", (req, res) => {
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
// router.get("/get-all-courses", (req, res) => {
//   // SQL statement to select all courses with their seat limits
//   const SQL =
//     "SELECT courseCode, courseName, department, seatLimit FROM courses";
//
//   // Execute the SQL query
//   db.query(SQL, (err, results) => {
//     if (err) {
//       console.error("Error fetching courses:", err);
//       res.status(500).send({ error: "Internal Server Error" });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

router.get("/enroll", (req, res) => {

  const userID = req.query.userID;

  console.log(`ENROLL ${userID}`);
  // check whether course exist or not

  const findEnrollment = "SELECT * FROM enrollment WHERE user_id = ?";
  const value = [userID];

  db.query(findEnrollment, value, (err, results) => {
    if (err) {
      // If there's an error, send the error as the response
      res.status(500).send(err);
    } else {
      // If successful, send the results as JSON response
      res.status(200).json(results);
    }
  });
});

router.post("/enroll", (req, res) => {
  const { userID, courseID } = req.body;

  const findEnrolledCourse = "SELECT * FROM enrollment WHERE course_id = ? && user_id = ?";

  const values = [courseID, userID];

  db.query(findEnrolledCourse, values, (err, results) => {
    if (err) {
      // If there's an error, send the error as the response
      console.error("Error finding enrolled course for the student:", err);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      // If successful, check length count. If length count > 0 means user is already enrolled
      // So it will not add the data in enrollment table

      if (results.length > 0) {
        // Exists
        res.status(400).send({
          message: "You are already enrolled"
        });
      } else {

        const enrolledSeatsSql = "SELECT enrolledSeats, seatLimit FROM courses WHERE id = ?"
        const enrolledCourseIDValue = [courseID]

        db.query(enrolledSeatsSql, enrolledCourseIDValue, (err, results) => {
          if (err) {
            // If there's an error, send the error as the response
            console.error("Error finding enrolled course for the student:", err);
            res.status(500).send({ error: "Internal Server Error" });
          } else {
            // // If successful, send the results as JSON response
            // res.status(200).json(results);
            const currentCourse = results[0];
            if (currentCourse) {
              if (currentCourse.seatLimit > currentCourse.enrolledSeats) {
                // can enroll
                const insertSqlCommand = "INSERT INTO enrollment (course_id, user_id) VALUES (?,?)";

                // Execute the SQL query
                db.query(insertSqlCommand, values, (err, results) => {
                  if (err) {
                    console.error("Error enrolling student:", err);
                    res.status(500).send({ error: "Internal Server Error" });
                  } else {
                    // TODO: If enroll is successful then increase enrolledSeats
                    const updateCommand = "UPDATE courses SET enrolledSeats = ? ";
                    const updatedSeat = currentCourse.enrolledSeats + 1;
                    const updatedSeatValue = [updatedSeat];

                    db.query(updateCommand, updatedSeatValue, (err, results) => {

                      if (err) {
                        console.error("Error enrolling student:", err);
                        res.status(500).send({ error: "Internal Server Error" });
                      } else {
                        res.status(200).send({ message: "Enrolled successfully" });
                      }
                    });
                    // res.status(200).send({ message: "Enrolled successfully" });
                  }
                });
              } else {
                // cannot enroll. Seat limit exceeded
                res.status(400).send({
                  message: "Seat limit exceeded"
                });
              }

            } else {
              console.error("Error finding enrolled course for the student:", currentCourse);
              res.status(500).send({ error: "Internal Server Error" });
            }
          }
        });

        // TODO: Check whether seat exists in the courses table
        // const insertSqlCommand = "INSERT INTO enrollment (course_id, user_id) VALUES (?,?)";
        //
        // // Execute the SQL query
        // db.query(insertSqlCommand, values, (err, results) => {
        //   if (err) {
        //     console.error("Error enrolling student:", err);
        //     res.status(500).send({ error: "Internal Server Error" });
        //   } else {
        //     // TODO: If enroll is successful then reduce seatCount
        //     res.status(200).send({ message: "Enrolled successfully" });
        //   }
        // });
      }
    }
  });

  // console.log(`USER ID IS ${userID} , ${courseID}`);
  // // SQL statement to update the seat limit for a course based on its course code
  // const insertSqlCommand = "INSERT INTO enrollment (course_id, user_id) VALUES (?,?)";
  // const values = [courseID, userID];
  //
  // // Execute the SQL query
  // db.query(insertSqlCommand, values, (err, results) => {
  //   if (err) {
  //     console.error("Error enrolling student:", err);
  //     res.status(500).send({ error: "Internal Server Error" });
  //   } else {
  //     res.status(200).send({ message: "Enrolled successfully" });
  //   }
  // });
});

module.exports = router
