import React from "react";
import Rating from "../Rating/Rating";
import "./ProductItem.css";
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
      <a className="product-image-link" href={`/products/${productId}`}>
        <img className="productImg" src={image} alt="Product" />
      </a>
      <Rating rating={rating} />
      <span>{`${rating} (${numReviews} reviews)`}</span>
      <span className="price">{`$ ${price}`}</span>
    </div>
  );
};

export default ProductItem;
