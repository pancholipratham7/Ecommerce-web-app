import React, { useEffect } from "react";
import Message from "../components/Message";
import classes from "./registerPage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useHistory, Link } from "react-router-dom";
import { registerUser } from "../store/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //getting the ui state
  const { errorMsg, isLoading, isError } = useSelector((state) => state.ui);

  // email state and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // message state for showing message that password and confirmPassword don't matches
  const [message, setMessage] = useState("");

  //getting the user Info
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);

  //submit form
  const registerFormSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }
    dispatch(registerUser(name, email, password));
  };

  //  Redirecting the user if logged in
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <div className={classes.registerPageContainer}>
      {isLoading && <Loader />}
      <form
        onSubmit={registerFormSubmitHandler}
        className={classes.registerForm}
      >
        <span className={classes.formName}>Sign In</span>
        {message && <Message className={classes.errorMsg}>{message}</Message>}
        {isError && <Message className={classes.errorMsg}>{errorMsg}</Message>}
        <label className={classes.nameLabel}>
          Name:
          <input
            onChange={(e) => setName(e.target.value)}
            className={classes.nameInput}
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
          />
        </label>
        <label className={classes.emailLabel}>
          Email Address:
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={classes.emailInput}
            type="email"
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
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
          />
        </label>
        <label className={classes.confirmPasswordLabel}>
          Confirm Password:
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classes.confirmPasswordInput}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter password again"
          />
        </label>
        <button className={classes.registerBtn}>REGISTER</button>
        <span>
          Have an account? <Link to="/login">Log In</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterPage;
