import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';

const PrivateRoute = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    // If the user is authenticated returns original path
    if(user) {
        return <Outlet />
    } else {
        // If the user is not authenticated goes to the Sign In page
        return <Navigate to="/signin" state={{from: location.pathname}} />;
    }
}

export default PrivateRoute;