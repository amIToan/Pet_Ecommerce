import express from "express";
import User from "./models/UserModel.js";
import users from "./datas/datas.js";
import products from "./datas/products.js";
import Product from "./models/ProductModel.js";
import expressAsyncHandler from "express-async-handler";
const ImportData = express.Router();
ImportData.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const importUsers = await User.insertMany(users);
    res.send({ importUsers });
  })
);
ImportData.post(
  "/products",
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);

module.exports = ImportData;
