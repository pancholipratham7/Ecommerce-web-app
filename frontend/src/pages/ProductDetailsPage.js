import React, { useState, useEffect, Fragment } from "react";
import Rating from "../components/Rating/Rating";
import classes from "./ProductDetailsPage.module.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../store/productsSlice";
import Loader from "./../components/Loader";
import Message from "../components/Message";
import { createProductReviewActions } from "../store/createProductReviewSlice";
import { createAProductReview } from "../store/createProductReviewSlice";

const ProductDetailsPage = () => {
  // All states needed in this component
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(0);
  const history = useHistory();

  // review states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // userInfo redux state
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);

  //create Product Review redux state
  const createProductReview = useSelector((state) => state.createProductReview);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = createProductReview;

  // GETTING THE PRODUCT Id from the url
  const { id: productId } = useParams();

  // getting the product details for productDetails page
  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch(createProductReviewActions.createProductReviewReset());
    }
    dispatch(getProductDetails(productId));
  }, [productId, dispatch, successReview]);

  // Array for product stock
  const stocks = [];
  for (let i = 0; i < product.countInStock; i++) {
    stocks.push("1");
  }

  // Handler product item qty
  const changeQtyHandler = (e) => {
    setQty(e.target.value);
  };

  //add to cart handler
  const addToCartHandler = () => {
    if (qty === 0) {
      setQty(1);
      history.push(`/cart/${product._id}?qty=${1}`);
    } else {
      history.push(`/cart/${product._id}?qty=${qty}`);
    }
  };

  // submit review handler
  const submitReviewHandler = (e) => {
    e.preventDefault();
    // creating a review
    dispatch(createAProductReview(productId, { rating, comment }));
  };

  return (
    <div className={classes.productDetailPageContainer}>
      <Link className={classes["go-to-home-pageBtn"]} to="/">
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <Message errorMsg={error} />}
      {!loading && !error && (
        <div className={classes["productDetails"]}>
          <div className={classes["productImageContainer"]}>
            <img
              className={classes["productImage"]}
              src={product.image}
              alt="Product"
            />
          </div>
          <div className={classes["productFullInfo"]}>
            <span className={classes["product-title"]}>{product.name}</span>
            <div className={classes["rating-row"]}>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <span
                className={classes["price-row"]}
              >{`Price: $${product.price}`}</span>
            </div>
            <span
              className={classes.productDescription}
            >{`Description: ${product.description}`}</span>
          </div>
          <div className={classes["add-to-cart-section"]}>
            <div className={classes["cart-price-content"]}>
              <span>Price:</span>
              <span>{`$${product.price}`}</span>
            </div>
            <div className={classes["cart-item-stock-status"]}>
              <span>Status:</span>
              <span>
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>
            {product.countInStock > 0 && (
              <div className={classes["cart-item-qty-select"]}>
                <span>Qty:</span>
                <select onChange={changeQtyHandler} name="qty" id="qty">
                  {stocks.map((qty, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={classes.addToCartBtn}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
      <div className={classes.productReviewsContainer}>
        {product.reviews.length > 0 && (
          <Fragment>
            <span className={classes.reviewSectionTitle}>Customer Reviews</span>
            <div className={classes.productReviews}>
              {product.reviews.map((review) => (
                <div key={review._id} className={classes.productReview}>
                  <span>{review.name}</span>
                  <Rating rating={review.rating} reviews={true} />
                  <span>{review.createdAt.substring(0, 10)}</span>
                  <span className={classes.comment}>{review.comment}</span>
                </div>
              ))}
            </div>
          </Fragment>
        )}
        <div className={classes.writeAReviewSection}>
          <span className={classes.writeTitle}>WRITE A CUSTOMER REVIEW</span>
          {successReview && (
            <Message variant="success">Review submitted successfully</Message>
          )}
          {loadingReview && <Loader />}
          {errorReview && <Message variant="danger">{errorReview}</Message>}
          {userInfo && (
            <form onSubmit={submitReviewHandler} className={classes.w}>
              <div className={classes.ratingInputSection}>
                <label for="customerRating">Rating:</label>
                <select
                  onChange={(e) => setRating(e.target.value)}
                  name="customerRating"
                  id="customerRating"
                  value={rating}
                >
                  <option value={0}>--Select--</option>
                  <option value={1}>1-Poor</option>
                  <option value={2}>2-Fair</option>
                  <option value={3}>3-Good</option>
                  <option value={4}>4-Very Good</option>
                  <option value={5}>5-Excellent</option>
                </select>
              </div>
              <div className={classes.commentSection}>
                <label for="comment">Comment:</label>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment"
                  rows={4}
                  value={comment}
                ></textarea>
              </div>
              <button className={classes.submitBtn}>SUBMIT</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
