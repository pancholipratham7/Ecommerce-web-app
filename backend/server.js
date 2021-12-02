const express = require("express");
const app = express();

// Routers
const productApiRouter = require("./routes/productsApiRoutes");

// using API router middleware for products
app.use("/api/products", productApiRouter);

app.get("/", (req, res, next) => {
  res.send("Hello from the server");
});

// Starting the server
const server = app.listen(2000, () => {
  console.log("Server Started");
});
