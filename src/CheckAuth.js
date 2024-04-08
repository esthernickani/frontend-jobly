import { Route, Routes, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";

const CheckAuth = ({ children }) => {
    const { currentUser } = useContext(UserContext)

    if (currentUser) {
        return <Navigate to="/" />
    }

    return children;
}

export default CheckAuth;