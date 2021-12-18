import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create product review initial State
const createProductReviewInitialState = {
  loading: false,
  success: false,
  error: null,
};

// slice for create product review
export const createProductReviewSlice = createSlice({
  name: "Create Product Review",
  initialState: createProductReviewInitialState,
  reducers: {
    createProductReviewRequest(state, action) {
      state.loading = true;
    },
    createProductReviewSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    createProductReviewFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    createProductReviewReset(state, action) {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
});

// Create product review slice actions and reducer
export const createProductReviewActions = createProductReviewSlice.actions;
export const createProductReviewReducer = createProductReviewSlice.reducer;

// action creator for creating a new review
export const createAProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      // making the loading state as true
      dispatch(createProductReviewActions.createProductReviewRequest());

      // getting the user details from the redux state
      const userInfo = getState().user.userLogin.userInfo;

      // setting up headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //   creating a new review
      const { data } = await axios.post(
        `http://localhost:5000/api/products/${productId}/reviews`,
        review,
        config
      );

      //   success dispatch
      dispatch(createProductReviewActions.createProductReviewSuccess());
    } catch (err) {
      console.log(err);
      dispatch(
        createProductReviewActions.createProductReviewFailed(
          err.response.data.message
        )
      );
    }
  };
