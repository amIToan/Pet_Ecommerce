const path = require("path");
const dirname = path.dirname;
const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel.js");
const Order = require("../models/OrderModel.js");
const { fileImageRoot, upload } = require("./multer.js");
const fs = require("fs");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/Authentication.js");
const productRoute = express.Router();
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword }); // total number of products
    const products = await Product.find({ ...keyword }) // find all products with keywords
      .populate("categories")
      .limit(pageSize) // giới hạn số record trong 1 trang
      .skip(pageSize * (page - 1)) // nhảy qua tổng record
      .sort({ _id: -1 }); // để sắp xếp
    res.json({ products, page, pages: Math.ceil(count / pageSize) }); //pages: Tổng số trang
  })
);

// GET ALL PRODUCT
//////////////////// get Hot Product
productRoute.get(
  "/hot",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
      .populate("categories")
      .sort({ _id: -1 });
    if (products) {
      const orders = await Order.find({});
      const hotProduct =
        orders?.length > 0 &&
        orders.reduce(
          (acc, currVal) => (acc = [...acc, ...currVal.orderItems]),
          []
        );
      const counts = {};
      hotProduct.forEach(function (x) {
        counts[x.product] = (counts[x] || x.quantity) + x.quantity;
      });
      const newHotPros = Object.keys(counts).sort((a, b) => b - a);
      if (newHotPros.length > 0) {
        const newHotHots = [];
        newHotPros.forEach((item) => {
          products.forEach((element) => {
            if (item == element._id.valueOf() || element.Type == 1) {
              newHotHots.push(element);
            }
          });
        });
        res.json(newHotHots);
      }
    } else {
      throw new Error("Product not Found");
    }
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGINATION
productRoute.get(
  "/all",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
      .populate("categories")
      .sort({ _id: -1 });
    if (products) {
      res.json(products);
    } else {
      throw new Error("Product not Found");
    }
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      try {
        product.image?.length > 0 &&
          product.image.forEach((item) => {
            if (fs.existsSync(fileImageRoot(item))) {
              fs.unlink(fileImageRoot(item), function (err) {
                if (err) throw err;
              });
            }
          });
        product.image = [];
        const updatedCate = await product.save();
        res.status(201).json(updatedCate);
      } catch (error) {
        throw new Error(error);
      }
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// CREATE PRODUCT
productRoute.post(
  "/",
  verifyTokenAndAdmin,
  upload.array("productImgs"),
  asyncHandler(async (req, res) => {
    const productImages = [];
    const {
      name,
      price,
      description,
      size,
      color,
      categories,
      countInStock,
      Type,
      discount,
    } = req.body;
    if (req.files && req.files.length > 0) {
      req.files.map((item) => productImages.push(item.filename));
    }
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        size,
        color,
        categories,
        countInStock,
        Type,
        discount,
        image: productImages,
        user: req.user._id,
      });
      await product.save((error, product) => {
        if (error) return res.status(404).json(error);
        if (product) return res.status(201).json(product);
      });
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.array("productImgs"),
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      size,
      color,
      categories,
      countInStock,
      Type,
      discount,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.categories = req.body.categories
        ? req.body.categories || categories
        : product.categories;
      product.size = size || product.size;
      product.color = color || product.color;
      product.countInStock = countInStock || product.countInStock;
      product.Type = Type || product.Type;
      product.discount = discount || product.discount;
      if (req.files && req.files.length > 0) {
        const productImages = [];
        req.files.map((item) => productImages.push(item.filename));
        try {
          product.image?.length > 0 &&
            product.image.forEach((item) => {
              if (fs.existsSync(fileImageRoot(item))) {
                fs.unlink(fileImageRoot(item), function (err) {
                  if (err) throw err;
                });
              }
            });
          product.image = productImages || product.image;
          const updatedCate = await product.save();
          res.status(201).json(updatedCate);
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          product.image?.length > 0 &&
            product.image.forEach((item) => {
              if (fs.existsSync(fileImageRoot(item))) {
                fs.unlink(fileImageRoot(item), function (err) {
                  if (err) throw err;
                });
              }
            });
          product.image = [];
          const updatedCate = await product.save();
          res.status(201).json(updatedCate);
        } catch (error) {
          throw new Error(error);
        }
      }
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
module.exports = productRoute;
