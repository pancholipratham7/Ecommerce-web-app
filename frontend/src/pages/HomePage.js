import React from "react";
import Products from "../components/Products/Products";
import classes from "./HomePage.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../store/productsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsList.products);
  const { isLoading, isError, errorMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  return (
    <div className={classes.mainContentContainer}>
      <h1 style={{ letterSpacing: "3px" }}>WELCOME TO SHOPZILLA</h1>
      {isLoading && <Loader />}
      {isError && <Message>{errorMsg}</Message>}
      {!isLoading && !isError && <Products products={products} />}
    </div>
  );
};

export default HomePage;
