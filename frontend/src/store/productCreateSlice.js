import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// productDelete initial state
const productCreateInitialState = {
  success: false,
  loading: false,
  error: "",
  newProduct: null,
};

// product delete slice
const productCreateSlice = createSlice({
  name: "product create",
  initialState: productCreateInitialState,
  reducers: {
    productCreateRequest(state, action) {
      state.loading = true;
    },
    productCreateFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productCreateSuccess(state, action) {
      state.success = true;
      state.error = "";
      state.loading = false;
      state.newProduct = action.payload;
    },
    productCreateReset(state, action) {
      state.success = false;
      state.error = "";
      state.loading = false;
    },
  },
});

// actions
export const productCreateReducer = productCreateSlice.reducer;
export const productCreateActions = productCreateSlice.actions;

// Action creator for deleting the product from the database
export const createProduct = () => async (dispatch, getState) => {
  try {
    // making the loading state  true
    dispatch(productCreateActions.productCreateRequest());

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
    const { data } = await axios.post(
      `http://localhost:5000/api/products`,
      {},
      config
    );
    console.log(data);

    // updating the redux state
    dispatch(productCreateActions.productCreateSuccess(data));

    // restting the redux state
    dispatch(productCreateActions.productCreateReset());
  } catch (err) {
    //   dispatching the error
    dispatch(
      productCreateActions.productCreateFailed(err.response.data.message)
    );
  }
};
