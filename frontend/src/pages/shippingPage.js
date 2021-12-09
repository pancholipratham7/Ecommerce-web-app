import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "../components/checkoutSteps";
import { saveShippingAddress } from "../store/cartSlice";
import classes from "./shippingPage.module.css";

const ShippingPage = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Getting the shipping address from the redux state if previously user has entered address anytime
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const { shippingAddress } = cart;

  // Component related states
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [city, setCity] = useState(shippingAddress.city);

  //   form submit handler
  const shippingFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // on submitting the form
    //we will dispatch this action in order to save the address in the redux state
    //as well as in the local storage
    dispatch(
      saveShippingAddress({
        city,
        address,
        postalCode,
        country,
      })
    );

    // after saving the address the user will be redirected to the payment method page
    history.push("/payment");
  };

  return (
    <div className={classes.shippingPageContainer}>
      <CheckoutSteps step1="YOO" step2="2" />
      <form
        onSubmit={shippingFormSubmitHandler}
        className={classes.shippingPageForm}
      >
        <span className={classes.formName}>SHIPPING</span>
        <label className={classes.addressLabel}>
          Address:
          <input
            onChange={(e) => setAddress(e.target.value)}
            className={classes.addressInput}
            type="text"
            name="address"
            value={address}
            placeholder="Enter address"
            required
          />
        </label>
        <label className={classes.cityLabel}>
          City:
          <input
            onChange={(e) => setCity(e.target.value)}
            className={classes.cityInput}
            type="text"
            name="city"
            value={city}
            placeholder="Enter city"
            required
          />
        </label>
        <label className={classes.postalCodeLabel}>
          Postal Code:
          <input
            onChange={(e) => setPostalCode(e.target.value)}
            className={classes.postalCodeInput}
            type="text"
            name="postalCode"
            value={postalCode}
            placeholder="Enter postalCode"
            required
          />
        </label>
        <label className={classes.countryLabel}>
          Country:
          <input
            onChange={(e) => setCountry(e.target.value)}
            className={classes.countryInput}
            type="text"
            name="country"
            value={country}
            placeholder="Enter country"
            required
          />
        </label>
        <button className={classes.shippingPageBtn}>CONTINUE</button>
      </form>
    </div>
  );
};

export default ShippingPage;
