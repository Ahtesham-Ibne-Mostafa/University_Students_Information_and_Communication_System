import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai"


enum CourseDataStatus {
    InitialStatus,
    AlreadyExist,
    Added,
    Empty,
    Failed
}

function AddCourseComponent() {

    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [department, setDepartment] = useState('');
    const [seatLimit, setSeatLimit] = useState(0);
    // Whether course added successfully or not
    const [courseDataStatus, setCourseDataStatus] = useState(CourseDataStatus.InitialStatus);

    const addClicked = () => {
        if (courseName === '' || department === '' || seatLimit === 0 || courseCode === '') {
            console.log(`INFORMING ${courseName} ${department} ${seatLimit} ${courseCode}`);
            setCourseDataStatus(CourseDataStatus.Empty);
        } else {
            console.log(`INFO ${courseCode} ${courseName} ${department} ${seatLimit}`);
            axios.post('http://localhost:3002/course', {
                courseName, courseCode, department, seatLimit
            }).then((response) => {
                console.log(`RESPONSE %o`, response);
                if (response.status === 200) {
                    if (response.data.error) {
                        console.log("Course already exist");
                        setCourseDataStatus(CourseDataStatus.AlreadyExist);
                    } else {
                        console.log("Added successfully");
                        setCourseDataStatus(CourseDataStatus.Added);
                    }
                } else {
                    console.log("Failed");

                    setCourseDataStatus(CourseDataStatus.Failed);
                }
            })
        }
    }

    const showAlert = () => {
        if (courseDataStatus == CourseDataStatus.Added) {
            alert('Course added successfully');
        } else if (courseDataStatus == CourseDataStatus.Failed) {
            alert('Something went wrong');
        } else if (courseDataStatus == CourseDataStatus.AlreadyExist) {
            alert('Course already exist');
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
            <h1> Add course </h1>

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
            <button type='submit' className='btn flex' onClick={addClicked}>
                <span>Add course</span>
                <AiOutlineSwapRight className="icon" />
            </button>
        </div>
    )
}

export default AddCourseComponent
