import { useRef, useContext, useState } from 'react';
import UserContext from '../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);

    // State
    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            email: email.current.value,
            password: password.current.value
        }


        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate("/");
            } else {
                setErrors(["Sign In was unsuccessful"])
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {errors.length ? (
                    <div>
                        <div className="validation-errors mb-3">
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <ul className='validation-errors'>
                                {errors.map((error, i) => <li key={i}>{error}</li>)}
                            </ul>
                        </div>
                    </div>
                ) : null}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

            </div>
        </main>
    )
}

export default UserSignIn;