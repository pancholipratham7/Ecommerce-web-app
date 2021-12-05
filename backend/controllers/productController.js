// this package is helpful to catch all the errors in async route handlers and then pass it to your express error handler
const asyncHandler = require("express-async-handler");
const Product = require("./../models/productModel");

// get all the products
// ROUTE:/api/products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  // getting all the products from the database
  const products = await Product.find({});
  res.status(200).json({
    status: "success",
    products,
  });
});

// get a single product
// Route: /api/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  // gettting the the particular product from the db through id
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json({
      status: "success",
      product,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.createNewProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});
