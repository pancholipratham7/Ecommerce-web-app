import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
import axios from "axios";
import { userActions } from "./userSlice";

// This slice is basically for getting the user details so that we can use it on the profile page
const userDetailsInitialState = { user: null };

const userDetailsSlice = createSlice({
  name: "user details",
  initialState: userDetailsInitialState,
  reducers: {
    setUserDetails(state, action) {
      state.user = action.payload;
    },
    updateUserDetails(state, action) {
      state.user = action.payload;
    },
    resetUserDetails(state, action) {
      state.user = null;
    },
  },
});

export const userDetailsReducer = userDetailsSlice.reducer;
export const userDetailsActions = userDetailsSlice.actions;

// We are using id here because for a normal user this value will be "profile"
// and for the admin it will be the id of the user
// and this action creator can be used by normal as well as admin
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    //   loading spinner
    dispatch(uiActions.userDetailsRequest());

    const userInfo = getState().user.userLogin.userInfo;

    // headers as a well as token header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // making a request to the backend to return the user's details
    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}`,
      config
    );

    // loading=false and isErrro=false
    dispatch(uiActions.userDetailsSuccess());

    // storing the user details in our redux store
    dispatch(userDetailsActions.setUserDetails(data));
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch(uiActions.userDetailsFailed(err.response.data.message));
  }
};

// Update user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    //   loading spinner
    dispatch(uiActions.userUpdateProfileRequest());

    // getting the token
    const userInfo = getState().user.userLogin.userInfo;
    console.log(userInfo);

    // headers as a well as token header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // making a request to the backend to update the user's details
    const { data } = await axios.put(
      `http://localhost:5000/api/users/profile`,
      user,
      config
    );

    console.log("UPDATED USER", data);

    // loading=false and isErrro=false
    dispatch(uiActions.userUpdateProfileSuccess());

    // updating the userInfo redux state
    dispatch(userActions.updateUserInfo(data));

    // updating the user details redux state
    dispatch(userDetailsActions.updateUserDetails(data));

    // storing the update profile in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch(uiActions.userUpdateProfileFailed(err.response.data.message));
  }
};
