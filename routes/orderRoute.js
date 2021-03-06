const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel.js");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/Authentication.js");
var dotenv = require("dotenv");
dotenv.config();
const orderRouter = express.Router();
//mail options 
//Sending Email
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
async function sendMail(mailOptions) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'giaivn1985@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

////
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
      //abronam @gmail.com
      const createOrder = await order.save();
      const mailOptionsOwner = {
        from: 'GIAIVN <giaivn1985@gmail.com>',
        to: 'toantq.xsoft@gmail.com',
        subject: `???? C?? M???T ????N ?????T H??NG M???I T??? GIAISHOP. XIN VUI L??NG KI???M TRA NGAY!!!`,
        text: 'V??o trang qu???n tr??? ????? ki???m tra th??ng tin chi ti???t : http://dashboard.giai.vn:99',
        html: `<h1>Email kh??ch h??ng : ${req.user.email}</h1><h3>T??n kh??ch h??ng: ${req.user.name}</h3><h3>Thanh to??n: ${createOrder.isPaid ? '???? thanh to??n' :
          'Ch??a thanh to??n'}</h3><h3>M?? ????n h??ng: ${createOrder._id}</h3><h3>T???ng s??? ti???n ????n h??ng : ${createOrder.totalPrice}</h3><h3>Ph????ng th???c thanh to??n : ${createOrder.paymentMethod}</h3>`
      };
      const mailOptionsBuyer = {
        from: 'GIAIVN <giaivn1985@gmail.com>',
        to: `${req.user.email}`,
        subject: `C???m ??n b???n ???? ?????t h??ng tr??n GiaiShop!!! `,
        text: 'CLICK V??O EMAIL ????N H??NG ????? KI???M TRA',
        html: `<h3>T??n kh??ch h??ng: ${req.user.name}</h3><h3>Thanh to??n: ${createOrder.isPaid ? '???? thanh to??n' :
          'Ch??a thanh to??n'}</h3><h3>T??nh tr???ng ????n h??ng: ${createOrder.isDelivered ? '???? ship' : 'Ch??a ???????c ship'}</h3><h3>M?? ????n h??ng: ${createOrder._id}</h3><h3>T???ng s??? ti???n ????n h??ng : ${createOrder.totalPrice}</h3><h3>Ph????ng th???c thanh to??n : ${createOrder.paymentMethod}</h3>`
      };
      sendMail(mailOptionsOwner)
      // .then((result) => console.log('Email sent...', result))
      // .catch((error) => console.log(error.message));
      sendMail(mailOptionsBuyer)
      // .then((result) => console.log('Email sent...', result))
      // .catch((error) => );
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
