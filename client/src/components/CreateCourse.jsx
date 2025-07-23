import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import ErrorsDisplay from './ErrorsDisplay.jsx';
import UserContext from '../context/UserContext.jsx';

function CreateCourse() {
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
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        }

        let credentials = {
            emailAddress: user.emailAddress,
            password: user.password
        }

        try {
            if (!user) {
                navigate('/signin');
            } else {
                const response = await api('/courses', 'POST', course, credentials);
                if (response.status === 201) {
                    console.log(`${course.title} was successfully created`);
                } else if (response.status === 400) {
                    const data = await response.json();
                    setErrors(data.errors);
                } else if (response.status === 401) {
                    const data = await response.json();
                    setErrors(data.errors);
                } else {
                    throw new Error();
                }
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>

                {errors.length ? (
                    <div className="validation--errors">
                        <h3 className="validation--errors">Validation errors</h3>
                        <ul className="validation--errors">
                            {errors.map((error, i) => <li className="validation--errors" key={i}>{error}</li>)}
                        </ul>
                    </div>

                ) : (null)}
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