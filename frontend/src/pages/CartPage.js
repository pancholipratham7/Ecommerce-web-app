import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../store/cartSlice";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import "./CartPage.css";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { removeFromCart } from "../store/cartSlice";
import { useHistory } from "react-router-dom";
const CartPage = () => {
  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  // Getting the qty param from the query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qty = queryParams.get("qty");

  // GETTING THE CART STATE FROM THE REDUX STORE
  const cart = useSelector((state) => state.cart.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  // Add to cart
  useEffect(() => {
    // If product Id is passed in the route :
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // Remove from cart handler
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // checkout handler
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="cart-section">
      <div className="cart-items-section">
        <span className="heading">SHOPPING CART</span>
        {cartItems.length === 0 ? (
          <Message variant="primary">
            Your shopping cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => {
              // This array is basically will be having all values as 1 and the length of this array will help in getting the nof of stocks of the product and we used array here so that we can use map on it
              let countStockArray = [];
              for (let i = 0; i < item.countInStock; i++) {
                countStockArray.push("1");
              }
              return (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt="" />
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price}</span>
                  <select
                    onChange={(e) =>
                      dispatch(addToCart(item.id, Number(e.target.value)))
                    }
                    value={item.qty}
                    name="qty"
                    id="qty"
                    className="qty"
                  >
                    {countStockArray.map((x, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <DeleteIcon
                    onClick={() => removeFromCartHandler(item.id)}
                    className="delete-icon"
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="checkout-section">
        <div className="subtotal-section">
          <span className="total-items">
            SUBTOTAL (
            {cartItems.reduce((acc, currValue) => {
              return acc + parseInt(currValue.qty);
            }, 0)}
            ) ITEMS
          </span>
          <span className="price">
            {`$ ${cartItems
              .reduce((acc, currValue) => {
                return acc + parseInt(currValue.qty) * currValue.price;
              }, 0)
              .toFixed(2)}`}
          </span>
        </div>
        <div className="checkout-btn-container">
          <button onClick={checkoutHandler} className="checkout-btn">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
