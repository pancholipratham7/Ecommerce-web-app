import React from "react";
import classes from "./Header.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { logoutUser } from "../store/userSlice";
import SearchBox from "./SearchBox";

const Header = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);
  const dispatch = useDispatch();

  return (
    <div className={classes.headerSection}>
      <div className={classes.headerContentContainer}>
        <div className={classes["brand-name"]}>
          <Link to="/">ShopZilla</Link>
          <SearchBox />
        </div>
        <div className={classes["nav-items"]}>
          <NavLink to="/cart" className={classes["nav-link"]}>
            <ShoppingCartIcon />
            CART
          </NavLink>
          {!userInfo && (
            <NavLink className={classes["nav-link"]} to="/register">
              <AccountCircle />
              SIGN IN
            </NavLink>
          )}
          {userInfo && (
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {userInfo.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(logoutUser())}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {userInfo && userInfo.isAdmin && (
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                Admin
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push("/admin/usersList")}>
                  Users
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => history.push("/admin/productsList")}
                >
                  Products
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => history.push("/admin/ordersList")}
                >
                  Orders
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
