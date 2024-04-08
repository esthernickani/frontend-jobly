import { Route, Routes, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";

const RequireAuth = ({ children }) => {
    const { currentUser } = useContext(UserContext)

    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return children;
}

export default RequireAuth;