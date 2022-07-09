// this package is helpful to catch all the errors in async route handlers and then pass it to your express error handler
const asyncHandler = require("express-async-handler");
const Product = require("./../models/productModel");

// get all the products
// ROUTE:/api/products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  // setting the page size
  // which basically determine the no of products on the page
  const pageSize = 3;

  // getting the page from the url
  const page = req.query.pageNumber || 1;

  // if keyword is present then getting hold of it
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          // for case insensitive
          $options: "i",
        },
      }
    : {};

  // Counting the no of products
  const productCount = await Product.count({ ...keyword });

  // getting all the products from the database
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(productCount / pageSize),
  });
});

// TOP PRODUCTS
exports.getTopProducts = asyncHandler(async (req, res, next) => {
  // getting the top 3 products
  const products = await Product.find().sort({ rating: -1 }).limit(3);

  res.json(products);
});

// get a single product
// Route: /api/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  // gettting the the particular product from the db through id
  const product = await Product.findById(req.params.id);

  console.log(product);
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

// Reviews -----

// create new Review
exports.createNewReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  // finding the product by the id
  const product = await Product.findById(req.params.id);

  if (product) {
    // If product found

    // then we need to check whether the product is already reviewed or not
    // Because one user can review one product only one time

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    console.log(alreadyReviewed);
    // If already Reviewed
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // If not already reviewd then creating the new review

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
      rating: Number(rating),
    };

    product.reviews.push(review);

    // Updating numReviews
    product.numReviews = product.reviews.length;

    // Updating product rating
    product.rating =
      product.reviews.reduce((acc, item) => {
        return acc + item.rating;
      }, 0) / product.reviews.length;

    // Updating product in the database
    await product.save();
    res.status(201).json("Review Added");

    // ....
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
