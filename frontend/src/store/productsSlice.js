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
export const getProductsList = () => async (dispatch) => {
  try {
    dispatch(productsListActions.productsListRequest());
    let res = await axios.get("http://localhost:5000/api/products");
    dispatch(productsListActions.productsListSuccess(res.data.products));
  } catch (err) {
    dispatch(productsListActions.productsListFailed(err.response.data.message));
  }
};

// Creating product details slice
const productDetailsInitialState = { product: { reviews: [] } };
const productDetailsSlice = createSlice({
  name: "Product Details",
  initialState: productDetailsInitialState,
  reducers: {
    setProductDetails(state, action) {
      state.product = action.payload;
    },
  },
});

// Action creator for getting product details
export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch(uiActions.productDetailsRequest());
    const res = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    dispatch(uiActions.productDetailsSuccess());
    dispatch(productDetailsActions.setProductDetails(res.data.product));
  } catch (err) {
    dispatch(uiActions.productsDetailsFailed(err.response.data.message));
  }
};

export const productDetailsActions = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;
