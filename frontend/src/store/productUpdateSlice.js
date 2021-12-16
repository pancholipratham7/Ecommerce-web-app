import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial update user state
const updateProductInitialState = {
  success: false,
  loading: false,
  error: "",
  product: null,
};

// update user slice
const updateProductSlice = createSlice({
  name: "update product",
  initialState: updateProductInitialState,
  reducers: {
    updateProductFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductRequest(state, action) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },

    updateProductReset(state, action) {
      state.error = "";
      state.loading = false;
      state.success = false;
      state.product = null;
    },
  },
});

// update user actions
export const updateProductActions = updateProductSlice.actions;
export const updateProductReducer = updateProductSlice.reducer;

// action creator for updating user admin

export const updateProductByAdmin = (product) => async (dispatch, getState) => {
  try {
    //loading state to true
    dispatch(updateProductActions.updateProductRequest());

    // getting the user details from the redux state
    const userInfo = getState().user.userLogin.userInfo;

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // updating the user in the backend and upating the redux state
    const { data } = await axios.put(
      `http://localhost:5000/api/products/${product._id}`,
      product,
      config
    );

    // updating user update success to true
    dispatch(updateProductActions.updateProductSuccess(data));

    // resetting the product update state
    dispatch(updateProductActions.updateProductReset());
  } catch (err) {
    // If any error occurs
    dispatch(updateProductActions.updateProductFailed(err));
  }
};
