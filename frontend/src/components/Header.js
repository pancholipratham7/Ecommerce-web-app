import React from "react";
import "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";

const Header = () => {
  return (
    <div className="headerSection">
      <div className="headerContentContainer">
        <div className="brand-name">
          <span>ShopZilla</span>
        </div>
        <div className="nav-items">
          <div className="cartNav">
            <ShoppingCartIcon />
            <span className="cart">CART</span>
          </div>
          <div className="profileNav">
            <AccountCircle />
            <span>SIGN IN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
