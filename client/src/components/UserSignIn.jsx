import React, { useRef, useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay.jsx';
import UserContext from '../context/UserContext.jsx';


const UserSignIn = () => {
    //Set the intial variables and states
    const { actions } = useContext(UserContext);

    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            emailAddress: email.current.value,
            password: password.current.value
        }

        try {
            // Tries to sign in sending the credentials to the signIn function
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
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
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don&apos;t have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

            </div>
        </main>
    )
}

export default UserSignIn;