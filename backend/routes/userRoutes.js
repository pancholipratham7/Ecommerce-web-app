const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("./../middlewares/authMiddleware").protect;

// login route
router.route("/login").post(userController.login);

// register user route
router.route("/register").post(userController.registerUser);

//get user profile route
router
  .route("/profile")
  .get(isAuthenticated, userController.getUserProfile)
  .put(isAuthenticated, userController.updateUserProfile);

module.exports = router;
