import React, { Fragment, useEffect } from "react";
import classes from "./OrderPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import { useParams } from "react-router-dom";
import Loader from "./../components/Loader";
import {
  getOrderDetails,
  orderDetailsActions,
} from "../store/orderDetailsSlice";
const OrderPage = () => {
  // Getting the id from the url
  const params = useParams();
  const orderId = params.id;

  //Hooks
  const dispatch = useDispatch();

  // order details state
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, success } = orderDetails;

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
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

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
                {!order.isPaid && <Message>Not Paid</Message>}
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
              <div className={classes.d}>
                <div>
                  <span className={classes.s}>Total</span>
                  <span className={classes.s}>${order.totalPrice}</span>
                </div>
              </div>
              {isError && <Message variant="danger">{errorMsg}</Message>}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default OrderPage;
