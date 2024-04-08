import { Route, Routes } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import Home from "./Home";
import UserContext from "./UserContext";
import { useContext } from "react";
import RequireAuth from "./RequireAuth";
import CheckAuth from "./CheckAuth";

function AppRoutes() {
    const { updateUser } = useContext(UserContext)

    return (
      <Routes>
          <Route exact path="/companies" element={
                                        <RequireAuth>
                                          <CompanyList />
                                        </RequireAuth>} />
          <Route exact path="/companies/:handle" element={
                                        <RequireAuth>
                                          <CompanyDetail />
                                        </RequireAuth>} />
          <Route exact path="/jobs" element={
                                        <RequireAuth>
                                          <JobList />
                                        </RequireAuth>} />
          <Route exact path="/login" element={
                                        <CheckAuth>
                                          <LoginForm/>
                                        </CheckAuth>} />
          <Route exact path="/signup" element={
                                        <CheckAuth>
                                          <SignupForm/>
                                        </CheckAuth>} />
          <Route exact path="/profile" element={ <RequireAuth>
                                                  <Profile />
                                                </RequireAuth>} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" />
        </Routes>
    );
  }

export default AppRoutes;