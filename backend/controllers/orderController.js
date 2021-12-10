const asyncHandler = require("express-async-handler");
const Order = require("./../models/orderModel");

// Function for creating a order or placing a order
exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    itemsPrice,
    taxPrice,
    shippingPrice,
  } = req.body;

  //If order items length==0 then we need to throw a error
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items present");
    return;
  }

  //   this transformed items is created because in the order items there will be id field but we want to name it as product because in the model the field is name as product
  const transformedOrderItems = orderItems.map((item) => {
    return {
      name: item.name,
      qty: item.qty,
      image: item.image,
      product: item.id,
      price: item.price,
    };
  });

  //   creating a new order
  const order = new Order({
    orderItems: transformedOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    totalPrice,
    taxPrice,
    itemsPrice,
    shippingPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});
