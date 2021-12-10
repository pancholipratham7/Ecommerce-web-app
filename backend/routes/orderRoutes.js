const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");
const isAuthenticated = require("./../middlewares/authMiddleware").protect;

// Setting up different routes

router.route("/").post(isAuthenticated, orderController.addOrderItems);

module.exports = router;
