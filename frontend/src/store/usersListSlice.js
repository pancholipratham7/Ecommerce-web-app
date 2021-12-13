import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// osersList initial state
const usersListInitialState = { users: [], loading: false, error: "" };

const usersListSlice = createSlice({
  name: "users List",
  initialState: usersListInitialState,
  reducers: {
    usersListRequest(state, action) {
      state.loading = true;
    },
    usersListFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    usersListSuccess(state, action) {
      state.users = action.payload;
      state.error = "";
      state.loading = false;
    },
    usersListReset(state, action) {
      state.users = [];
      state.error = "";
      state.loading = false;
    },
  },
});

// actions
export const usersListReducer = usersListSlice.reducer;
export const usersListActions = usersListSlice.actions;

// action creator for getting all orders from the backend and then updating it in the backend
export const getUsersList = () => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(usersListActions.usersListRequest());

    // getting the user details from the redux state
    const userInfo = getState().user.userLogin.userInfo;

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // fetching orders
    const { data } = await axios.get("http://localhost:5000/api/users", config);

    // updating the redux state
    dispatch(usersListActions.usersListSuccess(data));
  } catch (err) {
    //   dispatching the error
    dispatch(usersListActions.usersListFailed(err.response.data.message));
  }
};
