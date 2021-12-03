// Seeder is basically a method to initialize database with some initial values for testing purposes
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const User = require("./models/userModel");
const products = require("./data/products");
const users = require("./data/users");
const connectDb = require("./database");

// firstly connecting with the database
connectDb();

// Function for importing data in the database
const insertData = async () => {
  try {
    // deleting the already present data
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    //insertion of users
    const createdUsers = await User.insertMany(users);

    //Getting the admin Id
    const adminUserId = createdUsers[0]._id;

    //Adding user field to the product documents
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });

    // inserting products
    await Product.insertMany(sampleProducts);

    console.log("Data imported");

    // stopping the process otherwise it will keep running because this file is connected to the database
    process.exit();
  } catch (err) {
    console.log(`Error 💥: ${err.message}`);
    // One is passed for stating that error occured
    process.exit(1);
  }
};

// Function for deleting the data from the database
const destoryData = async () => {
  try {
    // deleting the data from the database
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.log(`Error 💥:${err.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destoryData();
} else {
  insertData();
}
