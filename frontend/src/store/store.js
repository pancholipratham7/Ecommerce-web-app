import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import { productsListReducer, productDetailsReducer } from "./productsSlice";
// Creating Slices

// 1.Products Slice

// Creating the store
const store = configureStore({
  reducer: {
    productsList: productsListReducer,
    ui: uiReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
