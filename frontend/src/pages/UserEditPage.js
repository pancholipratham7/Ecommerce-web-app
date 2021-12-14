import React, { Fragment, useEffect, useState } from "react";
import classes from "./UserEditPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/userDetailsSlice";
import { useHistory, useParams } from "react-router-dom";
import Loader from "./../components/Loader";
import Message from "./../components/Message";
import { updateUserActions, updateUserByAdmin } from "../store/userUpdateSlice";

const UserEditPage = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Input element states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // getting the user id from the url
  const params = useParams();
  const userId = params.id;

  //   ui state
  const ui = useSelector((state) => state.ui);
  const { isLoading, isError, errorMsg } = ui;

  //   userDetails state
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  console.log(user);

  //userInfo state
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);

  // userUpdate state
  const updateUser = useSelector((state) => state.updateUser);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateUser;

  //getting the user Details
  useEffect(() => {
    // If the user is updated then we need to reset the userUpdate again
    // and redirect the user to /admin/usersList
    if (successUpdate) {
      dispatch(updateUserActions.updateUserReset());
      history.push("/admin/usersList");
    }

    // If userDetails not present then we need to fetch the user Details
    else if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      // After fetching the userDetails we need to set the state
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user, userInfo, history, successUpdate]);

  //   form submit handler
  const userEditFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserByAdmin({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <div className={classes.userEditPageContainer}>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message>errorUpdate</Message>}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>{errorMsg}</Message>
      ) : (
        <form
          onSubmit={userEditFormSubmitHandler}
          className={classes.userEditForm}
        >
          <span className={classes.formName}>User Edit</span>
          <label className={classes.nameLabel}>
            Name:
            <input
              onChange={(e) => setName(e.target.value)}
              className={classes.nameInput}
              type="text"
              name="name"
              value={name}
            />
          </label>
          <label className={classes.emailLabel}>
            Email Address:
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={classes.emailInput}
              type="text"
              name="email"
              value={email}
            />
          </label>
          <div className={classes.isAdminContainer}>
            <input
              className={classes.isAdminInput}
              onChange={(e) => setIsAdmin(e.target.checked)}
              type="checkbox"
              name="checkbox"
              value="value"
              checked={isAdmin}
            />
            <span>Is Admin</span>
          </div>
          <button className={classes.updateBtn}>UPDATE</button>
        </form>
      )}
    </div>
  );
};

export default UserEditPage;
