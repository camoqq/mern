const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/orderModel");

//@description   Create new order
//@route         POST/api/orders
//@access        Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    // paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    // isPaid,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      user: req.user._id,
      //map orderItems because it is an array with name,qty,image,price as x
      // and product as the id --- look up orderModel
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

//@description   Get logged in user orders
//@route         GET/api/orders/myorders
//@access        Private
const getMyOrders = asyncHandler(async (req, res) => {
  // res.send("get my orders");
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

//@description   Get order by ID
//@route         GET/api/orders/:id
//@access        Private
const getOrderById = asyncHandler(async (req, res) => {
  // res.send("get order by id");
  const order = await Order.findById(req.params.id).populate(
    //use populate to add name and email from the user collection
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404); //404 =not found, 400= bad request
    throw new Error("Order not found");
  }
});

//@description   update order to paid
//@route         PUT/api/orders/:id/pay
//@access        Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

//@description   update order to delivered as admin
//@route         /api/orders/:id/delivered
//@access        Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

//@description   Get all orders
//@route         PUT/api/orders/
//@access        Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
