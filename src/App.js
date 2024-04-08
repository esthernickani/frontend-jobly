import logo from './logo.svg';
import { React, useEffect, useState } from "react";
import UserContext from './UserContext';
import './App.css';
import JoblyApi from './api';
import { BrowserRouter, Navigate } from "react-router-dom";
import NavBar from './NavBar';
import { jwtDecode } from "jwt-decode"
import AppRoutes from './Routes';

function App() {
  const [ token, setToken ] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ errorLogin, setErrorLogin ] = useState([]);
  const [ errorSignup, setErrorSignup] = useState([]);


  //function to add token to api, state and local storage
  const addToken = (userToken) => {
    JoblyApi.token = userToken
    setToken(userToken)
    localStorage.setItem('token', userToken)
  }

  //function to login user and add token to state, if error, go to form page again and show e
  async function loginUser ({ username, password }) {
    try {
      let response = await JoblyApi.loginUser(username, password)
      addToken(response.token);
    } catch (error) {
      return {success: false, error: error}
    }
  }

  //function to signup user and get user info
  async function signupUser (newUserInfo) {
    try {
      let response = await JoblyApi.registerUser(newUserInfo)
      addToken(response.token)
    } catch (error) {
      return {success: false, error: error}
    }
  }

  //function to update user info
  async function updateUser(updatedInfo) {
    try {
      let response = await JoblyApi.updateUser(currentUser.username, updatedInfo)
      setCurrentUser(response.user)
    } catch (error) {
      return {success: false, error: error}
    }
  }

  //remove token from state and local storage
  async function logoutUser() {
    setToken(null)
    localStorage.removeItem('token')
    return <Navigate to="/" />
  }

  //function to apply to job
  async function applyJob(username, id) {
    try {
      let response = await JoblyApi.applyForJob(username, id)
    } catch (error) {
      console.log(error)
    }
  }

  //to get user info, decode token
  useEffect(() => {
    //check if token is in local storage and add to state and api helper
    const tokenInLocalStorage = localStorage.getItem('token')
    let currentToken = tokenInLocalStorage || null
    setToken(currentToken)

    if (token) {
      JoblyApi.token = currentToken
      let decodedUser = jwtDecode(token)

      async function getUserDetail () {
        let userDetail = await JoblyApi.getUser(decodedUser.username)
        setCurrentUser(userDetail.user)
      }
      getUserDetail()
    }

  }, [token])

  return (
    <UserContext.Provider value={{currentUser, logoutUser, loginUser, signupUser, applyJob, updateUser}}>
      <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
