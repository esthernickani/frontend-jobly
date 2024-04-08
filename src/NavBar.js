import { React, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const NavBar = () => {
    const { currentUser, logoutUser } = useContext(UserContext)

    return (
        <>
            {currentUser ?
            <>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/companies">Companies</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={logoutUser}>Log out</button>
                </nav>
            </> :
            <>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </nav>
            </>
        }
        </>

    )
}

export default NavBar;