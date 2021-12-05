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
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
