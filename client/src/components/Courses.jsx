import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('https://full-stack-app-with-react-and-a-rest-api-production.up.railway.app/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.error('Error al cargar cursos:', err));
            
    }, []);

    return (
        <div className="wrap main--grid">
            {courses.map(course => (
                <Link key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            ))}
            <Link to="courses/create" className="course--module course--add--module">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div>
    );
};

export default Courses;