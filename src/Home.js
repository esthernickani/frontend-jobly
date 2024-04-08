import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
    const { currentUser, logoutUser } = useContext(UserContext)

    return (
        <>
            <h2>Jobly</h2>
            <p>All the jobs in one, convenient place</p>
            {currentUser?
                <p>Welcome Back {currentUser.firstName}</p> :
                <span>
                    <button> <Link to="/login"> Log in </Link> </button>
                    <button> <Link to="/signup"> Sign up </Link> </button>
                </span>

            }
        </>
    )
}

export default Home;