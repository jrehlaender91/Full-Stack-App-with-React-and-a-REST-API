import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import ReactMarkdown from 'react-markdown';

import UserContext from '../context/UserContext.jsx';


const CourseDetail = () => {
    //Set the intial variables and states
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Searchs for the course and pulls its data
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Curso no encontrado');
                }
                return res.json();
            })
            .then(data => {
                setCourse(data[0]);
            })
            .catch(err => {
                console.error('Error cargando curso:', err);
                setError(err.message);
            });
    }, [id]);



    if (error) {
        return <p>{error}</p>;
    }

    if (!course) {
        return <p>Curso no encontrado.</p>;
    }

    let owner = user && user.id === course.userId;

    // Delete course function, only works if the user is the owner
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            if (!user) {
                navigate('/signin');
                return null;
            } else {
                const response = await api(`/courses/${id}`, 'DELETE', course, {
                    emailAddress: user.emailAddress,
                    password: user.password,
                });
                if (response.status === 204) {
                    navigate('/');
                } else if (response.status === 400) {
                    const data = await response.json();
                    setError(Array.isArray(data.error) ? data.error : []);
                    navigate('/notfound');
                } else if (response.status === 401) {
                    const data = await response.json();
                    setError(Array.isArray(data.error) ? data.error : []); 
                    navigate('/forbidden');
                } else {
                    throw new Error();
                }
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {/* Ternary operation that checks if the owner is the authenticated user so it conditionally reveals buttons */}
                    {
                        owner ? (
                            <>
                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                <Link className="button" onClick={handleDelete}>Delete Course</Link>
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </>
                        ) : (
                            <>
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </>
                        )}

                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user?.firstName} {course.user?.lastName}</p>

                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;