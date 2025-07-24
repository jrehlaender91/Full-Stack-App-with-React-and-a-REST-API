import React, { useRef, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';

import ErrorsDisplay from './ErrorsDisplay.jsx';
import UserContext from '../context/UserContext.jsx';

function UserSignUp() {
    //Set the intial variables and states
    const navigate = useNavigate();
    const { actions } = useContext(UserContext);

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        try {
            // Posts new user data to the api
            const response = await api("/users", "POST", user);
            if (response.status === 201) {
                await actions.signIn(user);
                navigate("/");
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
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
            <div className="form--centered">
                <h2>Sign Up</h2>
                <div>
                    <ErrorsDisplay errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            ref={firstName} />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            ref={lastName} />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            ref={emailAddress} />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            ref={password} />
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <p>Already have a user account? Click here to <Link to="/signin">Click here</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;