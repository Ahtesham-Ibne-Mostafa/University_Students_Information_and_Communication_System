// client/src/components/CourseList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    return (
        <div>
            <h1>Course List</h1>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        {course.courseCode} - {course.courseName}
                        <button onClick={() => deleteCourse(course._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
