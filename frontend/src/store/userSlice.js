import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ordersListActions } from "./ordersListSlice";
import { uiActions } from "./uiSlice";
import { userDetailsActions } from "./userDetailsSlice";
import { usersListActions } from "./usersListSlice";

// user info from storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initial state
const userInitialState = { userLogin: { userInfo: userInfoFromStorage } };

// user Slice
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserDetails(state, action) {
      state.userLogin.userInfo = action.payload;
    },
    resetUserInfo(state, action) {
      state.userLogin.userInfo = null;
    },
    updateUserInfo(state, action) {
      state.userLogin.userInfo = action.payload;
    },
  },
});

// userReducers and userActions
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// user action reducer for getting user details
export const loginUser = (email, password) => async (dispatch) => {
  try {
    //   dispatching a ui action for making the loading state true
    dispatch(uiActions.userLoginRequest());

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // making a request to check whether the details entered by the user is correct or not and if matched then getting the details of the user
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      config
    );

    // so if user is found then we will set ui loading and error state ass false
    dispatch(uiActions.userLoginSuccess());

    //this action will basically store the user details as state
    dispatch(userActions.setUserDetails(data));

    // storing the user details in the local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    // if any error occurs then it will be caught here
    dispatch(uiActions.userLoginFailed(err.response.data.message));
  }
};

// user action creator for logging out user
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  // Resetting the user info
  dispatch(userActions.resetUserInfo());

  // resetting the user details
  dispatch(userDetailsActions.resetUserDetails());

  // resetting ordersList
  dispatch(ordersListActions.ordersListReset());

  // resetting users list
  dispatch(usersListActions.ordersListReset());
};

// action creator for Registering user
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    // action for setting the loading state =true
    dispatch(uiActions.registerUserRequest());

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // making a request to register the user
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      { email, password, name },
      config
    );

    // making the loading state=false
    dispatch(uiActions.registerUserSuccess());

    // dispatching an action for changing the state in order to store the details of registered user
    dispatch(userActions.setUserDetails(data));

    // storing the user details in the local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch(uiActions.registerUserFailed(err.response.data.message));
  }
};
