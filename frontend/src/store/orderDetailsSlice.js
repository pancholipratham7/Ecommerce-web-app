import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uiActions } from "./uiSlice";

// Initial State
const orderDetailsInitialState = { order: null, success: false };

// Order details Slice
// This will be useful on /order/:id page for getting the order details
const orderDetailsSlice = createSlice({
  name: "order details",
  initialState: orderDetailsInitialState,
  reducers: {
    setOrderDetails(state, action) {
      state.order = action.payload;
      state.success = true;
    },
    updatePrices(state, action) {
      state.order.shippingPrice = action.payload.shippingPrice;
      state.order.taxPrice = action.payload.taxPrice;
      state.order.totalPrice = action.payload.totalPrice;
      state.order.itemsPrice = action.payload.itemsPrice;
    },
  },
});

export const orderDetailsActions = orderDetailsSlice.actions;
export const orderDetailsReducer = orderDetailsSlice.reducer;

// action creator for getting the order from backend thorugh id and updating in the redux state
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    //setting the loading state to true
    dispatch(uiActions.orderDetailsRequest());

    //userInfo
    const userInfo = getState().user.userLogin.userInfo;

    // headers as a well as token header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // getting the order by the id
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    );

    // setting the loading state and error state to false
    dispatch(uiActions.orderDetailsSuccess());

    // Upadating the redux state order details
    dispatch(orderDetailsActions.setOrderDetails(data));
  } catch (err) {
    //   setting the error state to true
    dispatch(uiActions.orderDetailsFailed(err.response.data.message));
  }
};
