import React, { useState, useEffect } from "react";
import Rating from "../components/Rating/Rating";
import classes from "./ProductDetailsPage.module.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../store/productsSlice";
import Loader from "./../components/Loader";
import Message from "../components/Message";

const ProductDetailsPage = () => {
  // All states needed in this component
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(0);
  const history = useHistory();

  // GETTING THE PRODUCT Id from the url
  const { id: productId } = useParams();

  // getting the product details for productDetails page
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [productId, dispatch]);

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
    </div>
  );
};

export default ProductDetailsPage;
