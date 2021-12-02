import React from "react";
import Rating from "../components/Rating/Rating";
import classes from "./ProductDetailsPage.module.css";
import { Link, useParams } from "react-router-dom";
import products from "./../data/products.json";

const ProductDetailsPage = () => {
  // GETTING THE PRODUCT Id from the url
  const { id: productId } = useParams();

  // finding the a single product from bunch of products via id
  const product = products.find((product) => product._id === productId);
  return (
    <div className={classes.productDetailPageContainer}>
      <Link className={classes["go-to-home-pageBtn"]} to="/">
        Go Back
      </Link>
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
          <button
            onClick={() => alert("hI")}
            disabled={product.countInStock === 0}
            className={classes.addToCartBtn}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
