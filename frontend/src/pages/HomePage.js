import React from "react";
import Products from "../components/Products/Products";
import classes from "./HomePage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
    };
    fetchLatestProducts();
  }, []);

  return (
    <div className={classes.mainContentContainer}>
      <h1 style={{ letterSpacing: "3px" }}>WELCOME TO SHOPZILLA</h1>
      <Products products={products} />
    </div>
  );
};

export default HomePage;
