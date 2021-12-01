import React from "react";
import "./ProductItem.css";
const ProductItem = (props) => {
  const { id, name, rating, numReviews, price, image } = props.productDetail;
  console.log(props.productDetail);
  return (
    <div className="product-item">
      <div className="product-image">
        <a href={`product/${id}`}>
          <img src={image} alt="Product" />
        </a>
      </div>
      <div className="productInfo">
        <a href={`product/${id}`}>
          <p>{name}</p>
        </a>
        <p>{`${rating} from ${numReviews} reviews`}</p>
        <p className="price">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
