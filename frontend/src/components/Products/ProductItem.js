import React from "react";
import Rating from "../Rating/Rating";
import "./ProductItem.css";
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
    <div className="product-item">
      <p>{name}</p>
      <Link className="product-image-link" to={`/product/${productId}`}>
        <img className="productImg" src={image} alt="Product" />
      </Link>
      <Rating rating={rating} />
      <span>{`${rating} (${numReviews} reviews)`}</span>
      <span className="price">{`$ ${price}`}</span>
    </div>
  );
};

export default ProductItem;
