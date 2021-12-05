import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
import axios from "axios";

// All the slices related to products will be present in the file

// productsList initial state
const productsListInitialState = {
  products: [],
};

// Creating productsList slice
const productsListSlice = createSlice({
  initialState: productsListInitialState,
  name: "Latest Products",
  reducers: {
    setProductList(state, action) {
      state.products = [...action.payload];
    },
  },
});

export const productsActions = productsListSlice.actions;
export const productsListReducer = productsListSlice.reducer;

// action creator for getting latest products
export const getProductsList = () => async (dispatch) => {
  try {
    dispatch(uiActions.productListRequest());
    let res = await axios.get("http://localhost:5000/api/products");
    dispatch(uiActions.productListSuccess());
    dispatch(productsActions.setProductList(res.data.products));
  } catch (err) {
    dispatch(uiActions.productsListFailed(err.response.data.message));
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
