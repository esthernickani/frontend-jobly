import { React, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import JoblyApi from "./api";
import UserContext from "./UserContext";

const LoginForm = () => {
    const [ errors, setError ] = useState([])
    const { loginUser, currentUser } = useContext(UserContext);

    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    //login user on form submit and clear form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await loginUser(formData)
            if (!response.success) {
                setError(response.error)
            }

        } catch (error) {
            console.log(error)
        }
        setFormData(INITIAL_STATE);
    }

    return (
        <form className="LoginForm" onSubmit={handleSubmit}>
            <label htmlFor="username" >Username</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
            />

            {errors && errors.map(
                                    error => <p>{error}</p>
                        )}

            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm;