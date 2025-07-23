import { useContext } from 'react';
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';

const PrivateRoute = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if(user) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" state={{from: location.pathname}} />;
    }
}

export default PrivateRoute;