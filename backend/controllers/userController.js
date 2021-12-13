const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken").generateToken;
const { route } = require("../routes/userRoutes");

exports.login = asyncHandler(async (req, res, next) => {
  // getting the email and password from request
  const { email, password } = req.body;

  // Finding the user first by email
  const user = await User.findOne({ email: email });
  console.log(user);

  //If user is found then we need to match the password in the database
  //And if password matches then we need to send the details of the user
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //sending jwt token to the valid user
      token: generateToken(user._id),
    });
  } else {
    // Password not matched
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// getting user details and user profile
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// REGISTER USER
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// update user Profile function
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//For Admin
// get all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  // getting all the users
  const users = await User.find({});

  res.status(200).json(users);
});

// For admin
// deleting users
exports.deleteUser = asyncHandler(async (req, res, next) => {
  // Finding user by the id first
  const user = await User.findById(req.params.id);

  // If user found then we will delete the user
  if (user) {
    await user.remove();
    res.status(200).json("User Removed");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
