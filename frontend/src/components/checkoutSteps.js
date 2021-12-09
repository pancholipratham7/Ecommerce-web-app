import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./checkoutSteps.module.css";

const CheckoutSteps = (props) => {
  const { step1, step2, step3, step4 } = props;
  return (
    <div className={classes.checkoutStepsContainer}>
      {step1 ? (
        <NavLink activeStyle={{ color: "red" }} to="/login">
          Login
        </NavLink>
      ) : (
        <NavLink className={classes["disabled-step"]} disabled to="/login">
          Login
        </NavLink>
      )}
      {step2 ? (
        <NavLink activeStyle={{ color: "red" }} to="/shipping">
          Shipping
        </NavLink>
      ) : (
        <NavLink className={classes["disabled-step"]} disabled to="/shipping">
          Shipping
        </NavLink>
      )}
      {step3 ? (
        <NavLink activeStyle={{ color: "red" }} to="/payment">
          Payment
        </NavLink>
      ) : (
        <NavLink className={classes["disabled-step"]} disabled to="/payment">
          Payment
        </NavLink>
      )}
      {step4 ? (
        <NavLink activeStyle={{ color: "red" }} to="/placeOrder">
          Place Order
        </NavLink>
      ) : (
        <NavLink className={classes["disabled-step"]} disabled to="/placeOrder">
          Place Order
        </NavLink>
      )}
    </div>
  );
};

export default CheckoutSteps;
