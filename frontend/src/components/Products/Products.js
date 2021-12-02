import React from "react";
import productsData from "../../data/products.json";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  return (
    <div className={classes.productsContainer}>
      {productsData.map((product) => (
        <ProductItem productDetail={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;
