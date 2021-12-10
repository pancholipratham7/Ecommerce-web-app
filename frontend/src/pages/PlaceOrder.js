import React, { useEffect } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import classes from "./PlaceOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import { useHistory } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { createOrder } from "../store/orderCreateSlice";
const PlaceOrder = () => {
  //Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  // order state
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  // ui state
  const ui = useSelector((state) => state.ui);
  const { isError, errorMsg } = ui;

  // States needed in this component
  //payment method
  const paymentMethod = useSelector((state) => state.cart.cart.paymentMethod);

  //shipping address
  const shippingAddress = useSelector(
    (state) => state.cart.cart.shippingAddress
  );

  //  cart items
  const cart = useSelector((state) => state.cart.cart);
  const { cartItems } = cart;

  //calculating different prices used on this page
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  //if shipping address or payment method is not present in redux state
  if (!shippingAddress) {
    console.log("hi");
    history.push("/shipping");
  } else if (!paymentMethod) {
    history.push("/payment");
  }

  // upadating the prices in the redux state
  useEffect(() => {
    dispatch(
      cartActions.addAllPrices({
        taxPrice,
        shippingPrice,
        itemsPrice,
        totalPrice,
      })
    );
  }, [dispatch, taxPrice, shippingPrice, itemsPrice, totalPrice]);

  // Place order handler
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  // If the order is placed correctly then we need to redirect the user
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, history]);

  return (
    <div className={classes.placeOrderPageContainer}>
      <CheckoutSteps step1="1" step2="2" step3="3" step4="4" />
      <div className={classes["main-section"]}>
        <div className={classes["order-details-section"]}>
          <div className={classes["shipping-section"]}>
            <span className={classes["shipping-section-title"]}>SHIPPING</span>
            <span className={classes.address}>
              {`Address : ${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`}
            </span>
          </div>
          <div className={classes["payment-method-section"]}>
            <span className={classes["payment-section-title"]}>
              PAYMENT METHOD
            </span>
            <span
              className={classes.payment}
            >{`Method : ${paymentMethod} `}</span>
          </div>
          <div className={classes["order-items-section"]}>
            <span className={classes["order-items-section-title"]}>
              ORDER ITEMS
            </span>
            {cartItems.length === 0 ? (
              <Message>Your cart is empty....!</Message>
            ) : (
              <ul className={classes["order-items"]}>
                {cartItems.map((item, i) => (
                  <li key={i} className={classes["order-item"]}>
                    <div className={classes["img-container"]}>
                      <img src={item.image} alt="product" />
                    </div>
                    <span>{item.name}</span>
                    <span>{`${item.qty} x $${item.price} = $${
                      Number(item.qty) * item.price
                    }`}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={classes["order-summary-section"]}>
          <div className={classes.d}>
            <span className={classes["order-summary-title"]}>
              ORDER SUMMARY
            </span>
          </div>
          <div className={classes.d}>
            <div>
              <span className={classes.s}>Items</span>
              <span className={classes.s}>${itemsPrice}</span>
            </div>
          </div>
          <div className={classes.d}>
            <div>
              <span className={classes.s}>Shipping</span>
              <span className={classes.s}>${shippingPrice}</span>
            </div>
          </div>
          <div className={classes.d}>
            <div>
              <span className={classes.s}>Tax</span>
              <span className={classes.s}>${taxPrice}</span>
            </div>
          </div>
          <div className={classes.d}>
            <div>
              <span className={classes.s}>Total</span>
              <span className={classes.s}>${totalPrice}</span>
            </div>
          </div>
          {isError && <Message variant="danger">{errorMsg}</Message>}
          {cartItems.length === 0 ? (
            <button
              disabled
              className={`${classes["place-order-btn"]} ${classes.disabled}`}
            >
              Place order
            </button>
          ) : (
            <button
              onClick={placeOrderHandler}
              className={classes["place-order-btn"]}
            >
              Place order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
