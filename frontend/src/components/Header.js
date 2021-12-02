import React from "react";
import "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerSection">
      <div className="headerContentContainer">
        <div className="brand-name">
          <Link to="/">ShopZilla</Link>
        </div>
        <div className="nav-items">
          <NavLink to="/cart" className="nav-link">
            <ShoppingCartIcon />
            CART
          </NavLink>
          <NavLink className="nav-link" to="/signin">
            <AccountCircle />
            SIGN IN
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
