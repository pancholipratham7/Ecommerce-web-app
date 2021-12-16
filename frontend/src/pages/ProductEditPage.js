import React, { useState, useEffect } from "react";
import classes from "./ProductEditPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getProductDetails } from "../store/productsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateProductByAdmin } from "../store/productUpdateSlice";

const ProductEditPage = () => {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Input element states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(false);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // getting the product id from the url
  const params = useParams();
  const productId = params.id;

  //   userInfo redux state
  const userInfo = useSelector((state) => state.user.userLogin.userInfo);

  //   product details redux state
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  //   product update redux state
  const updateProduct = useSelector((state) => state.updateProduct);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateProduct;

  useEffect(() => {
    // If user is not logged in then redirecting the user to the login page
    if (!userInfo && !userInfo.name) {
      history.push("/login");
    }
    // If successfully updated the product then redirecting the user to the productsListPage
    else if (successUpdate) {
      history.push("/admin/productsList");
    }
    // If productDetails not present then we need to fetch the product Details
    else if (!product || !product.name || product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      // After fetching the productDetails we need to set the state
      setName(product.name);
      setBrand(product.brand);
      setImage(product.image);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, product, productId, userInfo, history, successUpdate]);

  //   product edit form submit handler
  const productEditFormSubmitHandler = (e) => {
    e.preventDefault();
    // Updating the product
    dispatch(
      updateProductByAdmin({
        _id: productId,
        name,
        brand,
        category,
        price,
        countInStock,
        image,
        description,
      })
    );
  };

  return (
    <div className={classes.productEditPageContainer}>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message>errorUpdate</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <form
          onSubmit={productEditFormSubmitHandler}
          className={classes.productEditForm}
        >
          <span className={classes.formName}>Edit Product</span>
          <label className={classes.nameLabel}>
            Name:
            <input
              onChange={(e) => setName(e.target.value)}
              className={classes.nameInput}
              type="text"
              name="name"
              value={name}
            />
          </label>
          <label className={classes.descriptionLabel}>
            Description:
            <input
              onChange={(e) => setDescription(e.target.value)}
              className={classes.descriptionInput}
              type="text"
              name="description"
              value={description}
            />
          </label>
          <label className={classes.priceLabel}>
            Price:
            <input
              onChange={(e) => setPrice(e.target.value)}
              className={classes.priceInput}
              type="text"
              name="price"
              value={price}
            />
          </label>
          <label className={classes.categoryLabel}>
            Category:
            <input
              onChange={(e) => setCategory(e.target.value)}
              className={classes.categoryInput}
              type="text"
              name="category"
              value={category}
            />
          </label>
          <label className={classes.brandLabel}>
            Brand:
            <input
              onChange={(e) => setBrand(e.target.value)}
              className={classes.brandInput}
              type="text"
              name="brand"
              value={brand}
            />
          </label>
          <label className={classes.imageLabel}>
            Image:
            <input
              onChange={(e) => setImage(e.target.value)}
              className={classes.imageInput}
              type="text"
              name="image"
              value={image}
            />
          </label>{" "}
          <label className={classes.countInStockLabel}>
            CountInStock:
            <input
              onChange={(e) => setCountInStock(e.target.value)}
              className={classes.countInStockInput}
              type="text"
              name="countInStock"
              value={countInStock}
            />
          </label>
          <button className={classes.updateBtn}>UPDATE</button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;
