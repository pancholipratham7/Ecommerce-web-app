import React from "react";
import classes from "./Header.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={classes.headerSection}>
      <div className={classes.headerContentContainer}>
        <div className={classes["brand-name"]}>
          <Link to="/">ShopZilla</Link>
        </div>
        <div className={classes["nav-items"]}>
          <NavLink to="/cart" className={classes["nav-link"]}>
            <ShoppingCartIcon />
            CART
          </NavLink>
          <NavLink className={classes["nav-link"]} to="/signin">
            <AccountCircle />
            SIGN IN
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
