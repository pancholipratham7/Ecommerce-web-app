import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// top Products initial state
const topProductsInitialState = {
  products: [],
  error: null,
  loading: false,
};

// Creating productsList slice
const topProductsSlice = createSlice({
  initialState: topProductsInitialState,
  name: "TOP PRODUCTS",
  reducers: {
    topProductsRequest(state, action) {
      state.loading = true;
    },
    topProductsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    topProductsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    topProductsReset(state, action) {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const topProductsActions = topProductsSlice.actions;
export const topProductsReducer = topProductsSlice.reducer;

// action creator for getting latest products
export const getTopProducts = () => async (dispatch) => {
  try {
    //   making the loading state as true
    dispatch(topProductsActions.topProductsRequest());

    // getting the top products
    let { data } = await axios.get(`http://localhost:5000/api/products/top`);

    dispatch(topProductsActions.topProductsSuccess(data));
  } catch (err) {
    dispatch(topProductsActions.topProductsFailed(err.response.data.message));
  }
};
