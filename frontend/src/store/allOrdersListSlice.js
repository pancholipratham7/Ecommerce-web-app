import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// osersList initial state
const allOrdersListInitialState = { orders: [], loading: false, error: "" };

const allOrdersListSlice = createSlice({
  name: "allOrders List",
  initialState: allOrdersListInitialState,
  reducers: {
    allOrdersListRequest(state, action) {
      state.loading = true;
    },
    allOrdersListFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    allOrdersListSuccess(state, action) {
      state.orders = action.payload;
      state.error = "";
      state.loading = false;
    },
    allOrdersListReset(state, action) {
      state.orders = [];
      state.error = "";
      state.loading = false;
    },
  },
});

// actions
export const allOrdersListReducer = allOrdersListSlice.reducer;
export const allOrdersListActions = allOrdersListSlice.actions;

// action creator for getting all users from the backend and then updating it in the redux state
export const getallOrdersList = () => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(allOrdersListActions.allOrdersListRequest());

    // getting the user details from the redux state
    const userInfo = getState().user.userLogin.userInfo;

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // fetching all users
    const { data } = await axios.get(
      "http://localhost:5000/api/orders",
      config
    );

    // updating the redux state
    dispatch(allOrdersListActions.allOrdersListSuccess(data));
  } catch (err) {
    //   dispatching the error
    dispatch(
      allOrdersListActions.allOrdersListFailed(err.response.data.message)
    );
  }
};
