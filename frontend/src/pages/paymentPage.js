import React from "react";
import CheckoutSteps from "../components/checkoutSteps";
import classes from "./paymentPage.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/cartSlice";
const PaymentPage = () => {
  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  //   getting te hold of shipping Address
  const shippingAddress = useSelector(
    (state) => state.cart.cart.shippingAddress
  );

  //   If shipping address is not present then redirecting the user to shipping page
  if (!shippingAddress) {
    history.push("/shipping");
  }

  // payment method state
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  console.log(paymentMethod);

  //   form submit handler
  const paymentFormSubmitHandler = (e) => {
    e.preventDefault();
    // dispatching an action to store the payment method in the redux state and in the localStorage
    dispatch(savePaymentMethod(paymentMethod));

    // redirecting user to the placeOrder PAGE
    history.push("/placeOrder");
  };

  return (
    <div className={classes.paymentPageContainer}>
      <CheckoutSteps step1="1" step2="2" step3="3" />
      <form
        onSubmit={paymentFormSubmitHandler}
        className={classes.paymentPageForm}
      >
        <span className={classes.title}>PAYMENT METHOD</span>
        <span className={classes.selectMethod}>Select Method</span>
        <div className={classes["payment-methods-container"]}>
          <input
            type="radio"
            id="paypal"
            name="payment-method"
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked
          />
          <label className={classes.paymentMethod} htmlFor="paypal">
            PayPal or Credit Card
          </label>
        </div>
        <button className={classes.paymentPageBtn}>Continue</button>
      </form>
    </div>
  );
};

export default PaymentPage;
