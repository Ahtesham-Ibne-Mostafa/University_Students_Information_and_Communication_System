import axios from "axios";
import React, { useState } from "react";

const AddUpdateSeatLimit = () => {
  const [courseCode, setCourseCode] = useState("");
  const [seatLimit, setSeatLimit] = useState("");

  const handleAddSeatLimit = () => {
    axios
      .post("api/courses/addSeatLimit", { courseCode, seatLimit })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding seat limit:", error);
      });
  };

  const handleUpdateSeatLimit = () => {
    axios
      .put(`api/courses/updateSeatLimit/${courseCode}`, { seatLimit })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating seat limit:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Course ID"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Seat Limit"
        value={seatLimit}
        onChange={(e) => setSeatLimit(e.target.value)}
      />
      <button onClick={handleAddSeatLimit}>Add Seat Limit</button>
      <button onClick={handleUpdateSeatLimit}>Update Seat Limit</button>
    </div>
  );
};

export default AddUpdateSeatLimit;
