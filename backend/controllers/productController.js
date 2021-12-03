const products = require("./../data/products.js");

// get all the products
exports.getAllProducts = (req, res, next) => {
  res.status(200).json({
    status: "success",
    products,
  });
};

// get a single product
exports.getProduct = (req, res, next) => {
  const product = products.find((product) => product._id === req.params.id);
  res.status(200).json({
    status: "success",
    product,
  });
};
exports.updateProduct = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};
exports.deleteProduct = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};
exports.createNewProduct = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};
