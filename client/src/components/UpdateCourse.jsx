import React, { useRef, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import ErrorsDisplay from './ErrorsDisplay.jsx';
import { api } from '../utils/apiHelper';

const UpdateCourse = () => {
    //Set the intial variables and states
    const { user } = useContext(UserContext);
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // Fetchs current data from the api
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`https://full-stack-app-with-react-and-a-rest-api-production.up.railway.app/api/courses/${id}`);
                if (res.status === 200) {
                    const data = await res.json();

                    // Takes the first element of a possible array
                    const courseData = Array.isArray(data) ? data[0] : data;

                    // Checks if the owner is the current authenticated user
                    if (!user || courseData.userId !== user.id) {
                        navigate('/forbidden', { replace: true });
                    } else {
                        setCourse(courseData);
                    }
                } else if (res.status === 404) {
                    navigate('/notfound', { replace: true });
                } else {
                    navigate('/error', { replace: true });
                }
            } catch (err) {
                console.error('Error loading course:', err);
                navigate('/error', { replace: true });
            }
        };

        fetchCourse();
    }, [id, user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            navigate('/signin');
            return;
        }

        const updatedCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        };

        try {
            const response = await api(`/courses/${id}`, 'PUT', updatedCourse, {
                emailAddress: user.emailAddress,
                password: user.password,
            });

            if (response.status === 204) {
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(Array.isArray(data.errors) ? data.errors : []);
            } else if (response.status === 401) {
                navigate('/forbidden');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error(error);
            navigate('/error');
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    };

    // Shows a message while the course data is uploading
    if (!course) {
        return <p>Cargando curso...</p>;
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                defaultValue={course.title}
                                ref={title}
                            />

                            <p>By {course.user?.firstName} {course.user?.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                defaultValue={course.description}
                                ref={description}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                defaultValue={course.estimatedTime}
                                ref={estimatedTime}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                defaultValue={course.materialsNeeded}
                                ref={materialsNeeded}
                            ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
};

export default UpdateCourse;
