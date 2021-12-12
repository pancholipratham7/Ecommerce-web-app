const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");
const isAuthenticated = require("./../middlewares/authMiddleware").protect;

// Setting up different routes

// creating a order with post request
router.route("/").post(isAuthenticated, orderController.addOrderItems);

// getting a order using id
router.route("/:id").get(isAuthenticated, orderController.getOrderById);

// pay route
router
  .route("/:id/pay")
  .put(isAuthenticated, orderController.updateOrderToPaid);

module.exports = router;
