import React from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  return (
    <div className={classes.productsContainer}>
      {props.products.map((product) => (
        <ProductItem productDetail={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;
