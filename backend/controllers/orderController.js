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

// Getting a order by id
exports.getOrderById = asyncHandler(async (req, res, next) => {
  // ORDER ID
  const orderId = req.params.id;

  // getting the order by id
  // Populating we only want the name and email field
  const order = await Order.findById(orderId).populate("user", "name email");

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found with this id");
    return;
  }
});

// updating order to pay
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  // getting the order by id
  const order = await Order.findById(req.params.id);

  // If order is found then we need to upate the paid field
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // This payment result will come from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // upadating the order
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
    return;
  }
});

// Mark the orders as delivered
exports.markOrderAsDelivered = asyncHandler(async (req, res, next) => {
  // First finding the order by id
  const order = await Order.findById(req.params.id);

  // If order found then marking it as delivered
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json("Order not found");
  }
});

// get all the orders for the logged in users
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Admin route
// Get all the orders
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name emaiL");
  res.json(orders);
});
