import React from "react";
import Products from "../components/Products/Products";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.mainContentContainer}>
      <h1 style={{ letterSpacing: "3px" }}>WELCOME TO SHOPZILLA</h1>
      <Products />
    </div>
  );
};

export default HomePage;
