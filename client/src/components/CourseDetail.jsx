import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);  // para manejar el estado de carga
    const [error, setError] = useState(null);      // para manejar errores

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Curso no encontrado');
                }
                return res.json();
            })
            .then(data => {
                setCourse(data[0]);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error cargando curso:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Cargando curso...</p>;
    }

    if (error) {
        return <p>{error}</p>; 
    }

    if (!course) {
        return <p>Curso no encontrado.</p>;
    }
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link className="button" to="/">Delete Course</Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By Joe Smith</p>

                            <p>{course.description}</p>
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