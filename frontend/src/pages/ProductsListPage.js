import React, { useEffect } from "react";
import classes from "./ProductsListPage.module.css";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loader from "./../components/Loader";
import Message from "./../components/Message";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getProductsList } from "../store/productsSlice";
import Add from "@material-ui/icons/Add";
import { deleteproduct } from "../store/productDeleteSlice";

const ProductsListPage = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  //   userInfo state
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);

  // productsList from redux
  const productsList = useSelector((state) => state.productsList);
  const { products, loading, error } = productsList;

  //   productDelete redux state
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  //getting the products list from the backend and updating it in the redux state
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getProductsList());
    }
  }, [dispatch, userInfo, history, successDelete]);

  //   product delete handler
  const productDeleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete the product")) {
      // deleting the product
      dispatch(deleteproduct(id));
    }
  };

  //   create product handler
  const createProductHandler = () => {};

  return (
    <div className={classes.productsListContainer}>
      <div className={classes.productsListTableContainer}>
        <div className={classes.titleContainer}>
          <span className={classes.title}>PRODUCTS</span>
          <Button variant="dark" onClick={createProductHandler}>
            <Add />
            Create Product
          </Button>
        </div>
        {loadingDelete && <Loader />}
        {errorDelete && <Message>{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table style={{ marginTop: "2rem" }} striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/user/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => productDeleteHandler(product._id)}
                      className="btn-sm"
                      variant="danger"
                    >
                      <DeleteIcon />
                    </Button>
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

export default ProductsListPage;
