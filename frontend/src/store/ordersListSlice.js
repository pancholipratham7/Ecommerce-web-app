import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ordersList initial state
// From this slice onwards we are not using the ui slice for loading and error purpose
// we are creating this fields in our slice only
const ordersListInitialState = { orders: [], loading: false, error: "" };

const ordersListSlice = createSlice({
  name: "orders List",
  initialState: ordersListInitialState,
  reducers: {
    ordersListRequest(state, action) {
      state.loading = true;
    },
    ordersListFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ordersListSuccess(state, action) {
      state.orders = action.payload;
      state.error = "";
      state.loading = false;
    },
    ordersListReset(state, action) {
      state.orders = [];
      state.error = "";
      state.loading = false;
    },
  },
});

// actions
export const ordersListReducer = ordersListSlice.reducer;
export const ordersListActions = ordersListSlice.actions;

// action creator for getting all orders from the backend and then updating it in the backend
export const getMyOrders = () => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(ordersListActions.ordersListRequest());

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
    const { data } = await axios.get(
      "http://localhost:5000/api/orders/myOrders",
      config
    );

    // updating the redux state
    dispatch(ordersListActions.ordersListSuccess(data));
  } catch (err) {
    //   dispatching the error
    dispatch(ordersListActions.ordersListFailed(err.response.data.message));
  }
};
