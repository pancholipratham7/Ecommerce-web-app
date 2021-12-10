const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./database.js");

// importing all the middlewares needed
const middlewares = require("./middlewares/errorMiddleware");

// connecting our application to database
connectDb();

// parsing the incoming data in req.body
app.use(express.json());

// Using cors to anable cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routers
const productApiRouter = require("./routes/productsApiRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

// Routes
// using API router middleware for products
app.use("/api/products", productApiRouter);

// userRoutes
app.use("/api/users", userRouter);

// Order routes
app.use("/api/orders", orderRouter);

app.get("/", (req, res, next) => {
  res.send("Hello from the server");
});

// showing not found for any others routes
app.use(middlewares.notFound);

// Global error handler middleware
app.use(middlewares.errorHandler);

// Starting the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server Started");
});
