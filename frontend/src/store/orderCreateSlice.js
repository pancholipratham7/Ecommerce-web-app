import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uiActions } from "./uiSlice";
const orderCreateInitialState = { order: null, success: false };

// This slice will be basically useful for the /placeOrder page
const orderCreateSlice = createSlice({
  name: "order create",
  initialState: orderCreateInitialState,
  reducers: {
    orderCreateSuccess(state, action) {
      state.order = action.payload;
      state.success = true;
    },
  },
});

export const orderCreateActions = orderCreateSlice.actions;
export const orderCreateReducer = orderCreateSlice.reducer;

// action creator for making a order at the backend
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // making the loading state true
    dispatch(uiActions.createOrderRequest());

    //userInfo
    const userInfo = getState().user.userLogin.userInfo;

    // headers as a well as token header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // making a request to create a order at the backend
    const { data } = await axios.post(
      "http://localhost:5000/api/orders",
      order,
      config
    );

    // dispatching an action for making the loading state=false and error=false
    dispatch(uiActions.createOrderSuccess());
    dispatch(orderCreateActions.orderCreateSuccess(data));
  } catch (err) {
    dispatch(uiActions.createOrderFailed(err.response.data.message));
  }
};
