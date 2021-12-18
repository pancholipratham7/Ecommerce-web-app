import React, { Fragment, useEffect } from "react";
import classes from "./ProductsListPage.module.css";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "./../components/Loader";
import Message from "./../components/Message";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getProductsList } from "../store/productsSlice";
import Add from "@material-ui/icons/Add";
import { deleteproduct } from "../store/productDeleteSlice";
import { createProduct } from "../store/productCreateSlice";
import Paginate from "../components/Paginate";

const ProductsListPage = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // getting the page number
  const pageNumber = params.pageNumber || 1;

  //   userInfo state
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);

  // productsList from redux
  const productsList = useSelector((state) => state.productsList);
  const { products, loading, error, pages, page } = productsList;

  //   productDelete redux state
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  //   product Create redux state
  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    newProduct,
    error: errorCreate,
  } = productCreate;

  //getting the products list from the backend and updating it in the redux state
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else if (successCreate) {
      history.push(`/product/${newProduct._id}`);
    } else {
      dispatch(getProductsList("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    newProduct,
    pageNumber,
  ]);

  //   product delete handler
  const productDeleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete the product")) {
      // deleting the product
      dispatch(deleteproduct(id));
    }
  };

  //   create product handler
  const createProductHandler = () => {
    dispatch(createProduct());
  };

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
        {loadingCreate && <Loader />}
        {errorCreate && <Message>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Fragment>
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
                      <Link to={`/admin/product/${product._id}/edit`}>
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
            <Paginate page={page} pages={pages} isAdmin={true} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;
