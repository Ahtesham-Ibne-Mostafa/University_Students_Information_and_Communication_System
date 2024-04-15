import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  department: string;
  seatLimit: number;
  enrolledSeats: number;
}


interface EnrolledCourse {
  id: number;
  course_id: number;
  user_id: number;
}



interface Props {
  isAdmin: boolean;
  userID: number;
}

enum ViewDataStatus {
  Initial,
  FailedToRemove,
  RemovedSuccessfully
}

function ViewCoursesComponent({ isAdmin, userID }: Props) {


  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [searchCourses, setSearchCourses] = useState("");
  const [removedCourseStatus, setRemovedCourseStatus] = useState(ViewDataStatus.Initial);

  const navigateTo = useNavigate();

  useEffect(() => {
    fetchData();
    if (removedCourseStatus == ViewDataStatus.RemovedSuccessfully) {
      setRemovedCourseStatus(ViewDataStatus.Initial);
    }
  }, [removedCourseStatus]);

  const fetchData = async () => {
    try {
      const response = await axios.get<Course[]>("http://localhost:3002/course");
      setCourses(response.data);
      const enrolledResponse = await axios.get<EnrolledCourse[]>("http://localhost:3002/course/enroll", {
        params: {
          userID
        }
      });
      setEnrolledCourses(enrolledResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const enrollCourseTap = (id: number) => {
    console.log(`BUTTON TAPPED ${id}`);
    axios.post("http://localhost:3002/course/enroll", {
      "courseID": id,
      "userID": userID
    }).then((response) => {
      console.log("RESPONSE IS %o", response);
      fetchData();
    })
  }

  const doesCourseIDExists = (id: number) => {
    const courseFound = enrolledCourses.find((enrolledCourse) => enrolledCourse.course_id == id);
    if (courseFound) {
      return true;
    } else {
      return false;
    }
  }

  const removeCourse = (id: number) => {
    console.log(`Number tapped ${id}`);
    axios.delete("http://localhost:3002/course", { data: { id } }).then((response) => {

      if (response.status === 200) {
        setRemovedCourseStatus(ViewDataStatus.RemovedSuccessfully);
      } else {
        setRemovedCourseStatus(ViewDataStatus.FailedToRemove);
      }
    })
  }

  const calculateRemainingSeats = (seatLimit: number, enrolledCount: number) => {
    return seatLimit - enrolledCount;
  }

  // handling search functionalities
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCourses(event.target.value);
  };

  const filteredCourseList = courses.filter((course) =>
    course.courseCode.toLowerCase().includes(searchCourses.toLowerCase())
  );

  if (courses === undefined || courses.length == 0) {
    return (
      <h1> No courses available. </h1>
    );
  }

  return (
    <div className="container">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Course Code"
          value={searchCourses}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {filteredCourseList.map((course) => (
          <div key={course.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Name: {course.courseName}</h5>
                <p className="card-text">Course code: {course.courseCode}</p>
                <p className="card-text">Department: {course.department}</p>
                <p className="card-text">Seat limit: {course.seatLimit}</p>
                <p className="card-text">
                  Remaining seats: {calculateRemainingSeats(course.seatLimit, course.enrolledSeats)}
                </p>
                {
                  isAdmin &&
                  <button type='submit' className='btn flex' onClick={() => removeCourse(course.id)}>
                    <span>Delete course</span>
                    <AiOutlineSwapRight className="icon" />
                  </button>
                }
                {
                  isAdmin &&
                  <button type='submit' className='btn flex' onClick={() =>
                    navigateTo("/dashboard/edit-course", { state: course })
                  }>
                    <span>Edit course</span>
                    <AiOutlineSwapRight className="icon" />
                  </button>
                }
                {
                  doesCourseIDExists(course.id) &&
                  <p className="card-text"> You are already enrolled in this course</p>
                }
                {
                  // If enrolledCourse does not contain the currentCourse id or if the enrolled course length is 0
                  // means the user can enroll in the course
                  !doesCourseIDExists(course.id) &&
                  <button type='submit' className='btn flex' onClick={() =>
                    enrollCourseTap(course.id)
                  }>
                    <span>Enroll this course</span>
                    <AiOutlineSwapRight className="icon" />
                  </button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}

export default ViewCoursesComponent
