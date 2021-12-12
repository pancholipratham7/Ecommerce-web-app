import React, { Fragment, useEffect, useState } from "react";
import classes from "./OrderPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import { useParams } from "react-router-dom";
import Loader from "./../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import {
  getOrderDetails,
  orderDetailsActions,
} from "../store/orderDetailsSlice";
import axios from "axios";
import { orderPayActions, payOrder } from "../store/orderPaySlice";

const OrderPage = () => {
  // Getting the id from the url
  const params = useParams();
  const orderId = params.id;

  //Hooks
  const dispatch = useDispatch();

  // state for whether the paypal script is loaded or not
  const [sdkReady, setSdkReady] = useState(false);

  // order details state
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;

  // order pay state
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  // ui state
  const ui = useSelector((state) => state.ui);
  const { isLoading, isError, errorMsg } = ui;

  //calculating different prices used on this page
  //   Calculate prices

  let itemsPrice;
  let totalPrice;
  let shippingPrice;
  let taxPrice;

  if (!isLoading && order != null) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
    taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);
    dispatch(
      orderDetailsActions.updatePrices({
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  }

  //Getting the order details through the id
  useEffect(() => {
    const payPalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:5000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // When the order is not loaded or success pay value is false
    // then we need to call getOrderDetails
    if (!order || successPay) {
      // This reset is  done in order to avoid infinite loop
      dispatch(orderPayActions.orderPayReset());
      dispatch(getOrderDetails(orderId));
    }
    // But if the order is loaded but the payment is not done yet and the paypal script is not connected to the html page then we need to add the paypal script
    // paypal script provides a global variable named as paypal and if it is present window.paypal that means paypal script is added to the html pagr
    else if (!order.isPaid) {
      if (!window.paypal) {
        payPalScript();
      }
    }
    // If the order is loaded as well as paid then we need to set the sdkready as true
    else {
      setSdkReady(true);
    }
  }, [order, orderId, successPay, dispatch]);

  // Success payment handler
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <div className={classes.placeOrderPageContainer}>
      {isLoading && <Loader />}
      {isError && <Message variant="danger">{errorMsg}</Message>}
      {order && (
        <Fragment>
          <h2 className={classes.orderId}>Order {order._id}</h2>
          <div className={classes["main-section"]}>
            <div className={classes["order-details-section"]}>
              <div className={classes["shipping-section"]}>
                <span className={classes["shipping-section-title"]}>
                  SHIPPING
                </span>
                <span
                  className={classes.name}
                >{`Name : ${order.user.name}`}</span>
                <a
                  href={`mailTo:${order.user.email}`}
                  className={classes.email}
                >{`Email : ${order.user.email}`}</a>
                <span className={classes.address}>
                  {`Address : ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                </span>
                {!order.isDelivered && <Message>Not Delivered</Message>}
              </div>
              <div className={classes["payment-method-section"]}>
                <span className={classes["payment-section-title"]}>
                  PAYMENT METHOD
                </span>
                <span
                  className={classes.payment}
                >{`Method : ${order.paymentMethod} `}</span>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message>Not Paid</Message>
                )}
              </div>
              <div className={classes["order-items-section"]}>
                <span className={classes["order-items-section-title"]}>
                  ORDER ITEMS
                </span>
                {order.orderItems.length === 0 ? (
                  <Message>Your cart is empty....!</Message>
                ) : (
                  <ul className={classes["order-items"]}>
                    {order.orderItems.map((item, i) => (
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
                  <span className={classes.s}>${order.itemsPrice}</span>
                </div>
              </div>
              <div className={classes.d}>
                <div>
                  <span className={classes.s}>Shipping</span>
                  <span className={classes.s}>${order.shippingPrice}</span>
                </div>
              </div>
              <div className={classes.d}>
                <div>
                  <span className={classes.s}>Tax</span>
                  <span className={classes.s}>${order.taxPrice}</span>
                </div>
              </div>
              <div className={`${classes.d} ${classes.l}`}>
                <div>
                  <span className={classes.s}>Total</span>
                  <span className={classes.s}>${order.totalPrice}</span>
                </div>
              </div>
              {isError && <Message variant="danger">{errorMsg}</Message>}
              {!order.isPaid && (
                <Fragment>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      className="payPalBtn"
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default OrderPage;
