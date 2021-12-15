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

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  // Finding the product by the id
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json("Product Removed");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Creating a new product by admin
exports.createNewProduct = asyncHandler(async (req, res, next) => {
  console.log("Vikram Batra");
  const product = new Product({
    name: "Sample Name",
    category: "Sample category",
    brand: "Sample Brand",
    countInStock: 0,
    numReviews: 0,
    price: 0,
    user: req.user._id,
    description: "Sample Description",
    image: "/images/sample.jpg",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// update product by admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category, brand, description, countInStock, image } =
    req.body;

  // finding the product first by id
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.countInStock = countInStock;
    product.image = product.image;
    product.brand = brand;
    product.category = category;
    product.price = price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
