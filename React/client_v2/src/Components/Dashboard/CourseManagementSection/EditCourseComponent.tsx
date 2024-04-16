// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useLocation } from "react-router-dom";

enum CourseDataStatus {
  InitialStatus,
  AlreadyExist,
  Added,
  Empty,
  Failed
}

function EditCourseComponent() {

  const location = useLocation();
  const data = location.state;

  const [courseCode, setCourseCode] = useState(data.courseCode);
  const [courseName, setCourseName] = useState(data.courseName);
  const [department, setDepartment] = useState(data.department);
  const [seatLimit, setSeatLimit] = useState(data.seatLimit);
  const id = data.id;
  // Whether course edited successfully or not
  const [courseDataStatus, setCourseDataStatus] = useState(CourseDataStatus.InitialStatus);


  console.log("COURSE IS %o", data);

  const editClicked = () => {
    if (courseName === '' || department === '' || seatLimit === 0 || courseCode === '') {
      console.log(`INFORMING ${courseName} ${department} ${seatLimit} ${courseCode}`);
      setCourseDataStatus(CourseDataStatus.Empty);
    } else {
      console.log(`INFO ${courseCode} ${courseName} ${department} ${seatLimit}`);
      axios.put('http://localhost:3002/course', {
        courseName, courseCode, department, seatLimit, id
      }).then((response) => {
        console.log(`RESPONSE %o`, response);
        if (response.status === 200) {
          console.log("Edited successfully");
          setCourseDataStatus(CourseDataStatus.Added);
        } else {
          console.log("Failed");

          setCourseDataStatus(CourseDataStatus.Failed);
        }
        // Go back after the action is done
        history.back();
      })
    }
  }

  const showAlert = () => {
    if (courseDataStatus == CourseDataStatus.Added) {
      alert('Course edited successfully');
    } else if (courseDataStatus == CourseDataStatus.Failed) {
      alert('Something went wrong');
    } else if (courseDataStatus == CourseDataStatus.Empty) {
      alert('Fillup the required fields');
    }
  };

  useEffect(() => {
    if (courseDataStatus == CourseDataStatus.Added) {
      // reset everything
      setCourseCode("");
      setCourseName("");
      setDepartment("");
      setSeatLimit(0);
    }
    showAlert();
    setCourseDataStatus(CourseDataStatus.InitialStatus);
  }, [courseDataStatus])



  return (
    <div>
      <h1> Edit course </h1>

      <div className="inputDiv">
        <div className="input flex">
          <input type="text" placeholder='Enter Course name'
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)} />
        </div>
      </div>
      <div className="input flex">
        <input type="text" placeholder='Enter Course code'
          value={courseCode}
          onChange={(event) => setCourseCode(event.target.value)} />
      </div>
      <div className="input flex">
        <input type="text" placeholder='Enter Department'
          value={department}
          onChange={(event) => setDepartment(event.target.value)} />
      </div>
      <div className="input flex">
        <input type="number" min={0} placeholder='Enter seat limit'
          value={seatLimit}
          onChange={(event) => setSeatLimit(parseInt(event.target.value))} />
      </div>
      <button type='submit' className='btn flex' onClick={editClicked}>
        <span>Edit course</span>
        <AiOutlineSwapRight className="icon" />
      </button>
    </div>
  )
}

export default EditCourseComponent
