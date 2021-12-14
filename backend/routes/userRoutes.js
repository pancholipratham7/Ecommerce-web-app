const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("./../middlewares/authMiddleware").protect;
const isAdmin = require("./../middlewares/authMiddleware").isAdmin;

// login route
router.route("/login").post(userController.login);

// register user route
router.route("/register").post(userController.registerUser);

//get user profile route
//  This is not a  admin route
router
  .route("/profile")
  .get(isAuthenticated, userController.getUserProfile)
  .put(isAuthenticated, userController.updateUserProfile);

// route for deleting the user and getting the user through Id
// these two routes are basically for admin
router
  .route("/:id")
  .delete(isAuthenticated, isAdmin, userController.deleteUser)
  .get(isAuthenticated, isAdmin, userController.getUserById)
  .put(isAuthenticated, isAdmin, userController.updateUserById);

//Admin route
// Route to get all the users
router.route("/").get(isAuthenticated, isAdmin, userController.getAllUsers);

module.exports = router;
