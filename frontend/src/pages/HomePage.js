import React from "react";
import Products from "../components/Products/Products";
import classes from "./HomePage.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../store/productsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
  // Hooks
  const dispatch = useDispatch();
  const params = useParams();

  // Product list redux state
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products } = productsList;

  // if keyword is present in the url then getting hold of it
  const keyword = params.keyword;

  useEffect(() => {
    dispatch(getProductsList(keyword));
  }, [dispatch, keyword]);

  return (
    <div className={classes.mainContentContainer}>
      <h1 style={{ letterSpacing: "3px" }}>WELCOME TO SHOPZILLA</h1>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {!loading && !error && products.length === 0 && (
        <Message>No product found....!</Message>
      )}
      {!loading && !error && <Products products={products} />}
    </div>
  );
};

export default HomePage;
