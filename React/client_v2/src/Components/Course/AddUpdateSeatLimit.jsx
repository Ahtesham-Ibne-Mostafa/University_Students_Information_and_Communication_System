import axios from "axios";
import React, { useState } from "react";

const AddUpdateSeatLimit = () => {
  // State variables to store course code and new seat limit
  const [courseCode, setCourseCode] = useState("");
  const [newSeatLimit, setNewSeatLimit] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Make POST request to server to add or change seat limit for the course
    axios
      .post("/courses/seatLimit", { courseCode, newSeatLimit })
      .then((response) => {
        console.log(response.data);
        // Clear form fields after successful submission
        setCourseCode("");
        setNewSeatLimit("");
      })
      .catch((error) => {
        console.error("Error updating seat limit:", error);
      });
  };

  return (
    <div>
      <h2>Add or Change Seat Limit for Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Code:
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </label>
        <label>
          New Seat Limit:
          <input
            type="number"
            value={newSeatLimit}
            onChange={(e) => setNewSeatLimit(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AddUpdateSeatLimit;
