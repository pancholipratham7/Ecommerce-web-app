import React, { useEffect } from "react";
import classes from "./allOrdersListPage.module.css";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import Loader from "./../components/Loader";
import Message from "./../components/Message";
import { useHistory, Link } from "react-router-dom";
import { getallOrdersList } from "../store/allOrdersListSlice";

const AllOrdersList = () => {
  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  // usersList from redux
  const allOrdersList = useSelector((state) => state.allOrdersList);
  const { orders, loading, error } = allOrdersList;

  //userInfo
  const userLogin = useSelector((state) => state.user.userLogin);
  const { userInfo } = userLogin;

  //getting all orders list from the backend and updating it in the redux state
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else if (orders.length === 0) {
      dispatch(getallOrdersList());
    }
  }, [orders, userInfo, history, dispatch]);

  return (
    <div className={classes.allOrdersListContainer}>
      <div className={classes.allOrdersListTableContainer}>
        <span className={classes.title}>All Orders</span>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table style={{ marginTop: "2rem" }} striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <CloseIcon style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <CloseIcon style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="dark">Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AllOrdersList;
