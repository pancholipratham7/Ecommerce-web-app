const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./database.js");

// connecting our application to database
connectDb();

// Using cors to anable cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routers
const productApiRouter = require("./routes/productsApiRoutes");

// using API router middleware for products
app.use("/api/products", productApiRouter);

app.get("/", (req, res, next) => {
  res.send("Hello from the server");
});

// Starting the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server Started");
});
