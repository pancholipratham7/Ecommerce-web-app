const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
const isAuthenticated = require("./../middlewares/authMiddleware").protect;
const isAdmin = require("./../middlewares/authMiddleware").isAdmin;

// Setting up different routes

router
  .route("/")
  .get(productController.getAllProducts)
  .post(isAuthenticated, isAdmin, productController.createNewProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .put(isAuthenticated, isAdmin, productController.updateProduct)
  .delete(isAuthenticated, isAdmin, productController.deleteProduct);

module.exports = router;
