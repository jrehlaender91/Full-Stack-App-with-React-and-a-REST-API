import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);    

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
                console.log(data[0])
            })
            .catch(err => {
                console.error('Error cargando curso:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} />

                            <p>By Joe Smith</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription">{course.description}</textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"><ReactMarkdown>{course.materialsNeeded}</ReactMarkdown></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;