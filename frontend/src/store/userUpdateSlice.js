import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userDetailsActions } from "./userDetailsSlice";

// initial update user state
const updateUserInitialState = { success: false, loading: false, error: "" };

// update user slice
const updateUserSlice = createSlice({
  name: "update user",
  initialState: updateUserInitialState,
  reducers: {
    updateUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest(state, action) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.success = true;
    },

    updateUserReset(state, action) {
      state.error = "";
      state.loading = false;
      state.success = false;
    },
  },
});

// update user actions
export const updateUserActions = updateUserSlice.actions;
export const updateUserReducer = updateUserSlice.reducer;

// action creator for updating user admin

export const updateUserByAdmin = (user) => async (dispatch, getState) => {
  try {
    //loading state to true
    dispatch(updateUserActions.updateUserRequest());

    // getting the user details from the redux state
    const userInfo = getState().user.userLogin.userInfo;

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // updating the user in the backend and upating the redux state
    const { data } = await axios.put(
      `http://localhost:5000/api/users/${user._id}`,
      user,
      config
    );

    // updating user update success to true
    dispatch(updateUserActions.updateUserSuccess());

    // updating the user details
    dispatch(userDetailsActions.setUserDetails(data));
  } catch (err) {
    // If any error occurs
    dispatch(updateUserActions.updateUserFailed(err));
  }
};
