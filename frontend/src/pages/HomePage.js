import React from "react";
import Products from "../components/Products/Products";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="mainContentContainer">
      <h1 style={{ letterSpacing: "3px" }}>WELCOME TO SHOPZILLA</h1>
      <Products />
    </div>
  );
};

export default HomePage;
