import React from "react";
import productsData from "../../data/products.json";
import ProductItem from "./ProductItem";
import "./Products.css";
const Products = () => {
  return (
    <div className="productsContainer">
      {productsData.map((product) => (
        <ProductItem productDetail={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;
