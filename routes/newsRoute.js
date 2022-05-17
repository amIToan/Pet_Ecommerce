const News = require("../models/NewsModel.js");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndUser,
} = require("../middleware/Authentication.js");
const newsRoute = express.Router();
// create Posts
newsRoute.post(
  "/create_posts",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const { title, slug, description, categories } = req.body;
    const newsPost = await News.create({
      title,
      slug,
      description,
      categories,
      user: req.user._id,
    });
    if (newsPost) {
      const createdPost = await newsPost.save();
      res.status(201).json(createdPost);
    } else {
      res.status(400);
      throw new Error();
    }
  })
);
// Get all Post
newsRoute.get(
  "/all",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    const allPosts = await News.find({});
    if (allPosts) {
      return res.status(200).json(allPosts);
    } else {
      res.status(401);
      throw new Error("You don't have the permission");
    }
  })
);
// Get User's Posts
newsRoute.get(
  "/user/:id",
  verifyTokenAndUser,
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.find({ user: req.user.id });
    console.log(userPosts);
    if (userPosts.length > 0) {
      return res.status(200).json(userPosts);
    } else {
      res.status(401);
      throw new Error("You don't have any posts");
    }
  })
);
// Update User's Posts
newsRoute.put(
  "/:id",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.findById(req.params.id);
    const { title, slug, description, categories } = req.body;
    if (userPosts) {
      if (
        req.user.isAdmin ||
        userPosts.user.valueOf() === req.user._id.valueOf()
      ) {
        userPosts.title = title || userPosts.title;
        userPosts.slug = slug || userPosts.slug;
        userPosts.description = description || userPosts.description;
        userPosts.categories = categories || userPosts.categories;
        const updatedProduct = await userPosts.save();
        res.status(200).json(updatedProduct);
      } else {
        res.status(500);
        throw new Error("Invalid Data!!!");
      }
    } else {
      res.status(401);
      throw new Error("Not found!!!");
    }
  })
);
//Delete Post
newsRoute.delete(
  "/:id",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.findById(req.params.id);
    console.log(userPosts.user.valueOf() === req.user._id.valueOf());
    if (userPosts) {
      if (
        req.user.isAdmin ||
        userPosts.user.valueOf() === req.user._id.valueOf()
      ) {
        const deletedPost = await userPosts.remove();
        res.status(200).json("Deleted successfully");
      } else {
        res.status(400);
        throw new Error("You don't have the permission");
      }
    } else {
      res.status(401);
      throw new Error("Not found!!!");
    }
  })
);
module.exports = newsRoute;
