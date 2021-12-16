const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");
const isAuthenticated = require("./../middlewares/authMiddleware").protect;
const isAdmin = require("./../middlewares/authMiddleware").isAdmin;

// Setting up different routes

// getMyOrders
router.route("/myOrders").get(isAuthenticated, orderController.getMyOrders);

// getting a order using id
router.route("/:id").get(isAuthenticated, orderController.getOrderById);

// pay route
router
  .route("/:id/pay")
  .put(isAuthenticated, orderController.updateOrderToPaid);

//delivered route
router
  .route("/:id/deliver")
  .put(isAuthenticated, isAdmin, orderController.markOrderAsDelivered);

// creating a order with post request
router.route("/").post(isAuthenticated, orderController.addOrderItems);

// getting all orders admin
router.route("/").get(isAuthenticated, isAdmin, orderController.getAllOrders);

module.exports = router;
