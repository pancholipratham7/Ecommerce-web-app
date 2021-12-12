import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const orderPayInitialState = {
  success: false,
  loading: false,
  isError: false,
  errorMsg: "",
};

// creating a order pay slice
const orderPaySlice = createSlice({
  name: "Order pay",
  initialState: orderPayInitialState,
  reducers: {
    orderPaySuccess(state, action) {
      state.success = true;
      state.isLoading = false;
      state.isError = false;
    },
    orderPayFailed(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.erroMsg = action.payload;
    },
    orderPayRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    orderPayReset(state, action) {
      state.isLoading = false;
      state.success = false;
      state.isError = false;
    },
  },
});

export const orderPayActions = orderPaySlice.actions;
export const orderPayReducer = orderPaySlice.reducer;

// ACTION CREATOR FOR UPDATING THE ORDER AS PAID IN THE DATABASE AS WELL AS UPDATING THE REDUX STATE
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayActions.orderPayRequest());
      const userInfo = getState().user.userLogin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch(orderPayActions.orderPaySuccess(data));
    } catch (err) {
      dispatch(orderPayActions.orderPayFailed(err.response.data.message));
    }
  };
