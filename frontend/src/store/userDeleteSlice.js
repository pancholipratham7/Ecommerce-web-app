import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// osersList initial state
const userDeleteInitialState = { success: false, loading: false, error: "" };

// user delete slice
const userDeleteSlice = createSlice({
  name: "users List",
  initialState: userDeleteInitialState,
  reducers: {
    userDeleteRequest(state, action) {
      state.loading = true;
    },
    userDeleteFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDeleteSuccess(state, action) {
      state.success = true;
      state.error = "";
      state.loading = false;
    },
    userDeleteReset(state, action) {
      state.success = false;
      state.error = "";
      state.loading = false;
    },
  },
});

// actions
export const userDeleteReducer = userDeleteSlice.reducer;
export const userDeleteActions = userDeleteSlice.actions;

// Action creator for deleting the user from the database
export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(userDeleteActions.userDeleteRequest());

    // getting the user details from the redux state
    const userInfo = getState().user.userLogin.userInfo;

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/users/${userId}`,
      config
    );

    // updating the redux state
    dispatch(userDeleteActions.userDeleteSuccess());

    // Resetting the userDelete success back to false
    dispatch(userDeleteActions.userDeleteReset());
  } catch (err) {
    //   dispatching the error
    dispatch(userDeleteActions.userDeleteFailed(err.response.data.message));
  }
};
