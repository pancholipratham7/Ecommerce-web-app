import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    productListRequest(state) {
      state.isLoading = true;
      state.isError = false;
    },
    productListSuccess(state) {
      state.isLoading = false;
      state.isError = false;
    },
    productsListFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    productDetailsRequest(state) {
      state.isLoading = true;
      state.isError = false;
    },
    productDetailsSuccess(state) {
      state.isLoading = false;
      state.isError = false;
    },
    productsDetailsFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    userLoginRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    userLoginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    userLoginFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    registerUserRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    registerUserFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    registerUserSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    userDetailsRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    userDetailsFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    userDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    userUpdateProfileRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    userUpdateProfileSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    userUpdateProfileFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    createOrderRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    createOrderFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    createOrderSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
    orderDetailsRequest(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    orderDetailsFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
    orderDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
