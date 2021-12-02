import "./App.css";
import Header from "./components/Header.js";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import React from "react";
function App() {
  return (
    <div className="pageContainer">
      <Header />
      <main className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<h1>Product Detail</h1>} />
          <Route path="/cart" element={<h1>Your Shopping Cart</h1>} />
          <Route path="/signin" element={<h1>Sign in to your account </h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
