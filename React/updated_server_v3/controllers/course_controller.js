const courseModel = require("../models/course_model")

// Add course
const addCourse = (req, res) => {

  const { courseCode, courseName, department, seatLimit } = req.body;

  // Search course based on course code
  courseModel.searchCourse(courseCode, (err, results) => {

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
      courseModel.insertCourse(courseCode, courseName, department, seatLimit, (err, results) => {
        if (err) {
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
      // const insertSqlCommand = "INSERT INTO courses (courseCode, courseName, department, seatLimit, enrolledSeats) VALUES (?,?,?,?,?)";
      // db.query(insertSqlCommand, value, (insertError, _insertResult) => {
      //   if (insertError) {
      //     console.log("Failed to insert data to db");
      //     console.log(value);
      //     res.status(500).send({
      //       "message": "Failed to add data",
      //       "error": true,
      //     });
      //   }
      //   res.status(200).send(
      //     {
      //       "message": "Added successfully",
      //       "error": false,
      //     }
      //   );
      // });
    }
  });



  // check whether course exist or not

  // const findCourseCommand = "SELECT * FROM courses WHERE courseCode = ?";
  // const value = [courseCode, courseName, department, seatLimit, 0];
  //
  // console.log(value);
  // db.query(findCourseCommand, value, (err, results) => {
  //   if (err) {
  //     console.log(`Error with db execution ${err}`);
  //     res.status(500).send({
  //       "message": "Error occurred",
  //       "error": true,
  //     });
  //   }
  //   if (results.length > 0) {
  //     // exists 
  //     res.status(200).send({
  //       "message": "Course already exists",
  //       "error": true,
  //     });
  //   } else {
  //     // add course
  //     const insertSqlCommand = "INSERT INTO courses (courseCode, courseName, department, seatLimit, enrolledSeats) VALUES (?,?,?,?,?)";
  //     db.query(insertSqlCommand, value, (insertError, _insertResult) => {
  //       if (insertError) {
  //         console.log("Failed to insert data to db");
  //         console.log(value);
  //         res.status(500).send({
  //           "message": "Failed to add data",
  //           "error": true,
  //         });
  //       }
  //       res.status(200).send(
  //         {
  //           "message": "Added successfully",
  //           "error": false,
  //         }
  //       );
  //     });
  //   }
  // });
}

// update course
const updateCourse = (req, res) => {
  const { id, courseCode, courseName, department, seatLimit } = req.body;

  // const SQL = "UPDATE courses SET courseCode=?,courseName=?,department=?, seatLimit=? WHERE id = ?";
  // const values = [courseCode, courseName, department, seatLimit, id];
  //
  // // Execute the SQL query
  // db.query(SQL, values, (err, results) => {
  //   if (err) {
  //     console.error("Error updating seat limit:", err);
  //     res.status(500).send({ error: "Internal Server Error" });
  //   } else {
  //     res.status(200).send({ message: "Data updated successfully" });
  //   }
  // });
  courseModel.updateCourse(courseCode, courseName, department, seatLimit, id, (err, results) => {

    if (err) {
      console.error("Error updating seat limit:", err);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(200).send({ message: "Data updated successfully" });
    }
  });
}

// Get Enroll course
const getEnrollCourse = (req, res) => {
  const userID = req.query.userID;

  console.log(`ENROLL ${userID}`);
  // check whether course exist or not
  courseModel.getEnrolledCourseByID(userID, (err, results) => {
    if (err) {
      // If there's an error, send the error as the response
      res.status(500).send(err);
    } else {
      // If successful, send the results as JSON response
      res.status(200).json(results);
    }

  });

  //   const findEnrollment = "SELECT * FROM enrollment WHERE user_id = ?";
  //   const value = [userID];
  //
  //   db.query(findEnrollment, value, (err, results) => {
  //     if (err) {
  //       // If there's an error, send the error as the response
  //       res.status(500).send(err);
  //     } else {
  //       // If successful, send the results as JSON response
  //       res.status(200).json(results);
  //     }
  //   });
}

// Enroll course

const enrollCourse = (req, res) => {
  const { userID, courseID } = req.body;
  courseModel.findEnrolledCourseByID(courseID, userID, (err, results) => {
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
        courseModel.getEnrolledSeatsAndLimit(courseID, (err, results) => {
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
                courseModel.insertInEnrollment(courseID, userID, (err, results) => {
                  if (err) {
                    console.error("Error enrolling student:", err);
                    res.status(500).send({ error: "Internal Server Error" });
                  } else {
                    // If enroll is successful then increase enrolledSeats
                    const updateCommand = "UPDATE courses SET enrolledSeats = ? ";
                    const updatedSeat = currentCourse.enrolledSeats + 1;
                    const updatedSeatValue = [updatedSeat];
                    courseModel.updateEnrolledSeatStatus(updatedSeat, (err, results) => {
                      if (err) {
                        console.error("Error enrolling student:", err);
                        res.status(500).send({ error: "Internal Server Error" });
                      } else {
                        res.status(200).send({ message: "Enrolled successfully" });
                      }
                    })

                  }
                })
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

        // const enrolledSeatsSql = "SELECT enrolledSeats, seatLimit FROM courses WHERE id = ?"
        // const enrolledCourseIDValue = [courseID]
        //
        // db.query(enrolledSeatsSql, enrolledCourseIDValue, (err, results) => {
        //   if (err) {
        //     // If there's an error, send the error as the response
        //     console.error("Error finding enrolled course for the student:", err);
        //     res.status(500).send({ error: "Internal Server Error" });
        //   } else {
        //     // // If successful, send the results as JSON response
        //     // res.status(200).json(results);
        //     const currentCourse = results[0];
        //     if (currentCourse) {
        //       if (currentCourse.seatLimit > currentCourse.enrolledSeats) {
        //         // can enroll
        //         const insertSqlCommand = "INSERT INTO enrollment (course_id, user_id) VALUES (?,?)";
        //
        //         // Execute the SQL query
        //         db.query(insertSqlCommand, values, (err, results) => {
        //           if (err) {
        //             console.error("Error enrolling student:", err);
        //             res.status(500).send({ error: "Internal Server Error" });
        //           } else {
        //             // If enroll is successful then increase enrolledSeats
        //             const updateCommand = "UPDATE courses SET enrolledSeats = ? ";
        //             const updatedSeat = currentCourse.enrolledSeats + 1;
        //             const updatedSeatValue = [updatedSeat];
        //
        //             db.query(updateCommand, updatedSeatValue, (err, results) => {
        //
        //               if (err) {
        //                 console.error("Error enrolling student:", err);
        //                 res.status(500).send({ error: "Internal Server Error" });
        //               } else {
        //                 res.status(200).send({ message: "Enrolled successfully" });
        //               }
        //             });
        //             // res.status(200).send({ message: "Enrolled successfully" });
        //           }
        //         });
        //       } else {
        //         // cannot enroll. Seat limit exceeded
        //         res.status(400).send({
        //           message: "Seat limit exceeded"
        //         });
        //       }
        //
        //     } else {
        //       console.error("Error finding enrolled course for the student:", currentCourse);
        //       res.status(500).send({ error: "Internal Server Error" });
        //     }
        //   }
        // });
      }
    }

  });


  // const findEnrolledCourse = "SELECT * FROM enrollment WHERE course_id = ? && user_id = ?";
  //
  // const values = [courseID, userID];

  // db.query(findEnrolledCourse, values, (err, results) => {
  //   if (err) {
  //     // If there's an error, send the error as the response
  //     console.error("Error finding enrolled course for the student:", err);
  //     res.status(500).send({ error: "Internal Server Error" });
  //   } else {
  //     // If successful, check length count. If length count > 0 means user is already enrolled
  //     // So it will not add the data in enrollment table
  //
  //     if (results.length > 0) {
  //       // Exists
  //       res.status(400).send({
  //         message: "You are already enrolled"
  //       });
  //     } else {
  //
  //       const enrolledSeatsSql = "SELECT enrolledSeats, seatLimit FROM courses WHERE id = ?"
  //       const enrolledCourseIDValue = [courseID]
  //
  //       db.query(enrolledSeatsSql, enrolledCourseIDValue, (err, results) => {
  //         if (err) {
  //           // If there's an error, send the error as the response
  //           console.error("Error finding enrolled course for the student:", err);
  //           res.status(500).send({ error: "Internal Server Error" });
  //         } else {
  //           // // If successful, send the results as JSON response
  //           // res.status(200).json(results);
  //           const currentCourse = results[0];
  //           if (currentCourse) {
  //             if (currentCourse.seatLimit > currentCourse.enrolledSeats) {
  //               // can enroll
  //               const insertSqlCommand = "INSERT INTO enrollment (course_id, user_id) VALUES (?,?)";
  //
  //               // Execute the SQL query
  //               db.query(insertSqlCommand, values, (err, results) => {
  //                 if (err) {
  //                   console.error("Error enrolling student:", err);
  //                   res.status(500).send({ error: "Internal Server Error" });
  //                 } else {
  //                   // If enroll is successful then increase enrolledSeats
  //                   const updateCommand = "UPDATE courses SET enrolledSeats = ? ";
  //                   const updatedSeat = currentCourse.enrolledSeats + 1;
  //                   const updatedSeatValue = [updatedSeat];
  //
  //                   db.query(updateCommand, updatedSeatValue, (err, results) => {
  //
  //                     if (err) {
  //                       console.error("Error enrolling student:", err);
  //                       res.status(500).send({ error: "Internal Server Error" });
  //                     } else {
  //                       res.status(200).send({ message: "Enrolled successfully" });
  //                     }
  //                   });
  //                   // res.status(200).send({ message: "Enrolled successfully" });
  //                 }
  //               });
  //             } else {
  //               // cannot enroll. Seat limit exceeded
  //               res.status(400).send({
  //                 message: "Seat limit exceeded"
  //               });
  //             }
  //
  //           } else {
  //             console.error("Error finding enrolled course for the student:", currentCourse);
  //             res.status(500).send({ error: "Internal Server Error" });
  //           }
  //         }
  //       });
  //     }
  //   }
  // });
}

const allCourses = (req, res) => {
  courseModel.getAllCourses((err, results) => {
    if (err) {
      // If there's an error, send the error as the response
      res.status(500).send(err);
    } else {
      // If successful, send the results as JSON response
      res.status(200).json(results);
    }
  });
}

const deleteCourse = (req, res) => {
  const { id } = req.body;
  console.log(`Remove course ${id}`);

  courseModel.deleteCourseByID(id, (err, _results) => {
    if (err) {
      console.error("Error removing courses", err);
      res.status(500).send({ error: "Internal Server Error" });
    } else {
      res.status(200).send({ message: "Course removed successfully" });
    }
  });

  // const SQL = "DELETE enrollment, courses FROM enrollment LEFT JOIN courses ON enrollment.course_id = courses.id WHERE enrollment.course_id = ?";
  // const values = [id];
  // db.query(SQL, values, (err, _results) => {
  //   if (err) {
  //     console.error("Error removing courses", err);
  //     res.status(500).send({ error: "Internal Server Error" });
  //   } else {
  //     res.status(200).send({ message: "Course removed successfully" });
  //   }
  // });
}

module.exports = {
  addCourse,
  updateCourse,
  getEnrollCourse,
  enrollCourse,
  allCourses,
  deleteCourse
}
