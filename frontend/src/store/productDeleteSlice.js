import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// productDelete initial state
const productDeleteInitialState = { success: false, loading: false, error: "" };

// product delete slice
const productDeleteSlice = createSlice({
  name: "product delete",
  initialState: productDeleteInitialState,
  reducers: {
    productDeleteRequest(state, action) {
      state.loading = true;
    },
    productDeleteFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productDeleteSuccess(state, action) {
      state.success = true;
      state.error = "";
      state.loading = false;
    },
    productDeleteReset(state, action) {
      state.success = false;
      state.error = "";
      state.loading = false;
    },
  },
});

// actions
export const productDeleteReducer = productDeleteSlice.reducer;
export const productDeleteActions = productDeleteSlice.actions;

// Action creator for deleting the product from the database
export const deleteproduct = (productId) => async (dispatch, getState) => {
  try {
    // making the loading state  true
    dispatch(productDeleteActions.productDeleteRequest());

    // getting the user details from the redux state
    const userInfo = getState().user.userLogin.userInfo;

    // setting up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // making a request to delete the product from the DB
    const { data } = await axios.delete(
      `http://localhost:5000/api/products/${productId}`,
      config
    );
    // updating the redux state
    dispatch(productDeleteActions.productDeleteSuccess());

    //resetting the product delete state
    dispatch(productDeleteActions.productDeleteReset());
  } catch (err) {
    //   dispatching the error
    dispatch(
      productDeleteActions.productDeleteFailed(err.response.data.message)
    );
  }
};
