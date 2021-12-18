import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
import axios from "axios";

// All the slices related to products will be present in the file

// productsList initial state
const productsListInitialState = {
  products: [],
  error: null,
  loading: false,
};

// Creating productsList slice
const productsListSlice = createSlice({
  initialState: productsListInitialState,
  name: "Products List",
  reducers: {
    productsListRequest(state, action) {
      state.loading = true;
    },
    productsListSuccess(state, action) {
      state.products = [...action.payload];
      state.loading = false;
      state.error = null;
    },
    productsListFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    productsListReset(state, action) {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const productsListActions = productsListSlice.actions;
export const productsListReducer = productsListSlice.reducer;

// action creator for getting latest products
export const getProductsList =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(productsListActions.productsListRequest());
      let res = await axios.get(
        `http://localhost:5000/api/products?keyword=${keyword}`
      );
      dispatch(productsListActions.productsListSuccess(res.data.products));
    } catch (err) {
      dispatch(
        productsListActions.productsListFailed(err.response.data.message)
      );
    }
  };

// Creating product details slice
const productDetailsInitialState = {
  product: { reviews: [] },
  loading: false,
  error: null,
};
const productDetailsSlice = createSlice({
  name: "Product Details",
  initialState: productDetailsInitialState,
  reducers: {
    productDetailsSuccess(state, action) {
      state.product = action.payload;
      state.loading = false;
    },
    productDetailsRequest(state, action) {
      state.loading = true;
    },
    productDetailsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productDetailsReset(state, action) {
      state.loading = false;
      state.error = null;
      state.product = { reviews: [] };
    },
  },
});

export const productDetailsActions = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;

// Action creator for getting product details
export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch(productDetailsActions.productDetailsRequest());
    const res = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    dispatch(productDetailsActions.productDetailsSuccess(res.data.product));
  } catch (err) {
    dispatch(
      productDetailsActions.productsDetailsFailed(err.response.data.message)
    );
  }
};
