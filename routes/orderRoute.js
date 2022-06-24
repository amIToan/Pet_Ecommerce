const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel.js");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/Authentication.js");
const orderRouter = express.Router();

// create Order
orderRouter.post(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);

// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email");
    res.json(orders);
  })
);
// USER LOGIN ORDERS
orderRouter.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

// GET  ORDER details BY Order ID
orderRouter.get(
  "/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    const newId = req.params.id.trim();
    if (newId.match(/^[0-9a-fA-F]{24}$/)) {
      const order = await Order.findById(newId).populate("user", "name email");
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order Not Found");
      }
    } else {
      throw new Error("Wrong Id");
    }
  })
);

// stet ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  verifyToken,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.paymentMethod === "PayPal") {
        order.isPaid = true;
      } else {
        order.isPaid = false;
      }
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address || null,
      };
      const updatedOrder = await order.save();
      updatedOrder && res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// set ORDER IS updated
orderRouter.put(
  "/:id/updateOrder",
  verifyToken,
  asyncHandler(async (req, res) => {
    // console.log(req.body);
    const order = await Order.findById(req.params.id);
    if (order) {
      if (req.body.isDelivered) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      if (req.body.status) {
        order.paymentResult.status = "COMPLETED";
        order.paymentResult.update_time = Date.now();
        order.isPaid = true;
      }
      order.taxPrice = req.body.taxPrice || order.taxPrice;
      order.shippingPrice = req.body.shippingPrice || order.shippingPrice;
      order.totalPrice = req.body.totalPrice || order.totalPrice;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

module.exports = orderRouter;
