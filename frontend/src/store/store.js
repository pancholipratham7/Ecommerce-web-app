import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import { productsListReducer, productDetailsReducer } from "./productsSlice";
import { cartReducer } from "./cartSlice";

// Creating the store
const store = configureStore({
  reducer: {
    productsList: productsListReducer,
    ui: uiReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
});

export default store;
