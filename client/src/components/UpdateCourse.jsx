import { useRef, useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import UserContext from '../context/UserContext.jsx';

const UpdateCourse = () => {
    //Current user info
    const { user } = useContext(UserContext);
    const [course, setCourse] = useState("");
    const [error, setError] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    const fetchOptions = {
        method: "GET"
    };

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => { setCourse(data[0]) })
            .catch(err => {
                console.error('There was a problem loading this course', err);
                setError(['Error loading course']);
            });
    }, [id]);
    console.log(user);
    console.log(course);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let credentials = {
            emailAddress: user.emailAddress,
            password: user.password
        }

        const updatedCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} ref={title} />

                            <p>By {course.user?.firstName} {course.user?.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} ref={materialsNeeded} ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;