import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// cart initial state
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartInitialState = {
  cart: { cartItems: cartItemsFromStorage },
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart(state, action) {
      // This var is for finding the index of existing item in the array
      let existingItemIndex = "";

      // If the item is already present in the cart
      if (
        state.cart.cartItems.find((item, i) => {
          existingItemIndex = i;
          return item.id === action.payload.id;
        })
      ) {
        // If the item is already present but the qty is changed then
        if (
          state.cart.cartItems[existingItemIndex].qty !== action.payload.qty
        ) {
          state.cart.cartItems[existingItemIndex] = action.payload;
        }

        console.log("Already present");
        // But if the item is already present and the qty is also not changed then we don't need to do anything
      }
      // If the item is not present in the array then we just need to add the item in the array
      else {
        state.cart.cartItems.push(action.payload);
        console.log("Added to the cart");
      }
    },
    removeFromCart(state, action) {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// cart custom action creator
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    //getting the product data from the backend
    const res = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );

    //dispatching the action for  adding the product in the cart
    // We are not passing the whole product only passing the necessary field
    dispatch(
      cartActions.addToCart({
        name: res.data.product.name,
        qty: qty,
        id: res.data.product._id,
        countInStock: res.data.product.countInStock,
        image: res.data.product.image,
        price: res.data.product.price,
      })
    );

    //getState is also passed as a argument in dispatch
    // Storing the cart items in the local storage so that once we shut the application then also our items will be present in the cart
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cart.cartItems)
    );
  } catch (err) {
    console.log(err.response.data);
  }
};

// Action creator for removing the item from the cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  // Dispatching the action for removing the item from the cart
  dispatch(cartActions.removeFromCart(id));
  // setting the new state in the localStorage after deleting the item from the cart
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cart.cartItems)
  );
};
