import React, { useEffect } from "react";
import Message from "../components/Message";
import classes from "./profilePage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../store/userDetailsSlice";

const ProfilePage = () => {
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

  // getting the user details
  const user = useSelector((state) => state.userDetails.user);

  //submit form
  const updateProfileFormSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  //  Redirecting the user if logged in
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user]);

  return (
    <div className={classes.updateProfilePageContainer}>
      {isLoading && <Loader />}
      <form
        onSubmit={updateProfileFormSubmitHandler}
        className={classes.updateProfileForm}
      >
        <span className={classes.formName}>Update Profile</span>
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
        <button className={classes.updateProfileBtn}>UPDATE</button>
      </form>
    </div>
  );
};

export default ProfilePage;
