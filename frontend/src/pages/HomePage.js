import React from "react";
import Products from "../components/Products/Products";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="mainContentContainer">
      <h1>LATEST PRODUCTS</h1>
      <Products />
    </div>
  );
};

export default HomePage;
