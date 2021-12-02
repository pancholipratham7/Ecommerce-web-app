const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

// Loading the env variables
dotenv.config({ path: "./config.env" });

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
