import React from "react";
import Products from "../components/Products/Products";
import classes from "./HomePage.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../store/productsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const HomePage = () => {
  // Hooks
  const dispatch = useDispatch();
  const params = useParams();

  // Product list redux state
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products, page, pages } = productsList;

  // if keyword is present in the url then getting hold of it
  const keyword = params.keyword;

  // getting the hold of page number
  const pageNumber = params.pageNumber || 1;

  useEffect(() => {
    dispatch(getProductsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className={classes.mainContentContainer}>
      <h1 style={{ letterSpacing: "3px" }}>WELCOME TO SHOPZILLA</h1>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {!loading && !error && products.length === 0 && (
        <Message>No product found....!</Message>
      )}
      {!loading && !error && <Products products={products} />}
      <div className={classes.paginationContainer}>
        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
      </div>
    </div>
  );
};

export default HomePage;
