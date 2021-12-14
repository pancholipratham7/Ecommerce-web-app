import React, { useEffect } from "react";
import Message from "../components/Message";
import classes from "./loginPage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import Loader from "../components/Loader";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  //getting the ui state
  const { errorMsg, isLoading, isError } = useSelector((state) => state.ui);

  // email state and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //getting the user Info
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);
  console.log(userInfo);

  // Redirecting
  // If the url is like this /login?redirect=shipping then if the user is logged in then we need to redirect the user
  //to the shipping page not to the home page
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect")
    ? `/${queryParams.get("redirect")}`
    : "/";

  //submit form
  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  //  Redirecting the user if logged in
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  console.log(isLoading, isError);

  return (
    <div className={classes.loginPageContainer}>
      {isLoading && <Loader />}
      <form onSubmit={loginFormSubmitHandler} className={classes.loginForm}>
        <span className={classes.formName}>Log In</span>
        {isError && <Message className={classes.errorMsg}>{errorMsg}</Message>}
        <label className={classes.emailLabel}>
          Email Address:
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={classes.nameInput}
            type="text"
            name="email"
            value={email}
            placeholder="Enter email address"
          />
        </label>
        <label className={classes.passwordLabel}>
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            className={classes.passwordInput}
            type="text"
            name="password"
            value={password}
            placeholder="Enter password"
          />
        </label>
        <button className={classes.loginBtn}>LOG IN</button>
        <span>
          New Customer ? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
