import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

const UserSignOut = () => {
    // Gets user and functions from context
    const { actions } = useContext(UserContext);

    // Calls the signOut function
    useEffect(() => actions.signOut());

    return <Navigate to="/" replace />
}

export default UserSignOut
