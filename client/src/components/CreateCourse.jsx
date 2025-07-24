import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import ErrorsDisplay from './ErrorsDisplay.jsx';
import UserContext from '../context/UserContext.jsx';

function CreateCourse() {
    //Set the intial variables and states
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    let courseTitle = useRef(null);
    let courseDescription = useRef(null);
    let estimatedTime = useRef(null);
    let materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const course = {
            // Gets the current information from the form
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: user.id

        }

        try {
            // Private route: if user its not authenticated, goes to Sign In page
            if (!user) {
                navigate('/signin');
                return null;
            } else {
                // Sends instructions and credentials to the api
                const response = await api('/courses', 'POST', course, {
                    emailAddress: user.emailAddress,
                    password: user.password,
                });
                if (response.status === 201) {
                    const location = response.headers.get('Location');
                    const courseId = location ? location.split('/').pop() : null;
                    navigate(courseId ? `/courses/${courseId}` : '/');
                } else if (response.status === 400 || response.status === 401) {
                    const data = await response.json(); // AQUÍ sí es un Response válido
                    setErrors(Array.isArray(data.errors) ? data.errors : []);
                } else {
                    throw new Error();
                }
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    // Sends user to home
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>

                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default CreateCourse;