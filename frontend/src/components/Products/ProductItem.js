import React from "react";
import Rating from "../Rating/Rating";
import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
const ProductItem = (props) => {
  const {
    _id: productId,
    name,
    rating,
    numReviews,
    price,
    image,
  } = props.productDetail;

  return (
    <div className={classes["product-item"]}>
      <p>{name}</p>
      <Link
        className={classes["product-image-link"]}
        to={`/product/${productId}`}
      >
        <img className={classes.productImg} src={image} alt="Product" />
      </Link>
      <Rating rating={rating} numReviews={numReviews} />
      <span className={classes.price}>{`$ ${price}`}</span>
    </div>
  );
};

export default ProductItem;
