// client/src/components/CourseForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        courseCode: '',
        courseName: '',
        department: '',
        seatLimit: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/courses', formData);
            alert('Course created successfully!');
            setFormData({
                courseCode: '',
                courseName: '',
                department: '',
                seatLimit: ''
            });
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div>
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} placeholder="Course Code" required />
                <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Course Name" required />
                <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
                <input type="number" name="seatLimit" value={formData.seatLimit} onChange={handleChange} placeholder="Seat Limit" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CourseForm;
