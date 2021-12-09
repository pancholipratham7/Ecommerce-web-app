import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import { productsListReducer, productDetailsReducer } from "./productsSlice";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";
import { userDetailsReducer } from "./userDetailsSlice";

// Creating the store
const store = configureStore({
  reducer: {
    productsList: productsListReducer,
    ui: uiReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
