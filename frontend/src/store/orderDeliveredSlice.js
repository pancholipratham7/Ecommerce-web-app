import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const orderDeliveredInitialState = {
  success: false,
  loading: false,
  error: null,
};

// creating a order deliver slice
const orderDeliveredSlice = createSlice({
  name: "Order Delivered",
  initialState: orderDeliveredInitialState,
  reducers: {
    orderDeliveredSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = false;
    },
    orderDeliveredFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderDeliveredRequest(state, action) {
      state.loading = true;
    },
    orderDeliveredReset(state, action) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const orderDeliveredActions = orderDeliveredSlice.actions;
export const orderDeliveredReducer = orderDeliveredSlice.reducer;

// ACTION CREATOR FOR UPDATING THE ORDER AS PAID IN THE DATABASE AS WELL AS UPDATING THE REDUX STATE
export const markAsDeliveredOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliveredActions.orderDeliveredRequest());

    // getting the user info
    const userInfo = getState().user.userLogin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${orderId}/deliver`,
      {},
      config
    );

    // dispatching for successfully delivered
    dispatch(orderDeliveredActions.orderDeliveredSuccess());
  } catch (err) {
    dispatch(
      orderDeliveredActions.orderDeliveredFailed(err.response.data.message)
    );
  }
};
