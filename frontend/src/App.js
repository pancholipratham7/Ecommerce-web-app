import classes from "./App.module.css";
import Header from "./components/Header.js";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import React from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";
function App() {
  return (
    <div className={classes.pageContainer}>
      <Header />
      <main className={classes.mainContainer}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<h1>Your Shopping Cart</h1>} />
          <Route path="/signin" element={<h1>Sign in to your account </h1>} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
