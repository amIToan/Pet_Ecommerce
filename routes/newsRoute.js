const path = require("path");
const dirname = path.dirname;
const { fileURLToPath } = require("url");
const multer = require("multer");
const shortId = require("shortid");
const fs = require("fs");
const ___filename = fileURLToPath(
  require("url").pathToFileURL(__filename).toString()
);
const ___dirname = dirname(___filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(___dirname), "uploaded_Images/News"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const fileImageRoot = (x) =>
  path.join(path.dirname(___dirname), "uploaded_Images/News", x);

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
  upload.array("newsImgs"),
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const newsImages = [];
    if (req.files && req.files.length > 0) {
      req.files.map((item) => newsImages.push(item.filename));
    }
    const { title, MetaKeyword, MetaDes, slug, description } = req.body;
    const newsExist = await News.findOne({ title });
    if (newsExist) {
      res.status(400);
      throw new Error("News name already exist");
    } else {
      const newsPost = await News.create({
        title,
        MetaKeyword,
        MetaDes,
        slug,
        description,
        image: newsImages,
        user: req.user._id,
      });
      if (newsPost) {
        const createdPost = await newsPost.save();
        res.status(201).json(createdPost);
      } else {
        res.status(400);
        throw new Error();
      }
    }
  })
);
// Get all Post
newsRoute.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.pageNumber) || 1;
    const count = await News.countDocuments({}); // total number of products
    const allPosts = await News.find({})
      .limit(pageSize) // giới hạn số record trong 1 trang
      .skip(pageSize * (page - 1)) // nhảy qua tổng record
      .sort({ _id: -1 }); // để sắp xếp;
    if (allPosts) {
      return res
        .status(200)
        .json({ allPosts, page, pages: Math.ceil(count / pageSize) });
    } else {
      res.status(401);
      throw new Error("You don't have the permission");
    }
  })
);
// Get User's Posts
newsRoute.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.findById(req.params.id);
    if (userPosts) {
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
  upload.array("newsImgs"),
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.findById(req.params.id);
    const { title, MetaKeyword, MetaDes, slug, description, categories } =
      req.body;
    if (userPosts) {
      if (
        req.user.isAdmin ||
        userPosts.user.valueOf() === req.user._id.valueOf()
      ) {
        userPosts.title = title || userPosts.title;
        userPosts.MetaKeyword = MetaKeyword || userPosts.MetaKeyword;
        userPosts.MetaDes = MetaDes || userPosts.MetaDes;
        userPosts.slug = slug || userPosts.slug;
        userPosts.description = description || userPosts.description;
        userPosts.categories = categories || userPosts.categories;
        if (req.files && req.files.length > 0) {
          const newsImages = [];
          req.files.map((item) => newsImages.push(item.filename));
          try {
            userPosts.image?.length > 0 &&
              userPosts.image.forEach((item) => {
                if (fs.existsSync(fileImageRoot(item))) {
                  fs.unlink(fileImageRoot(item), function (err) {
                    if (err) throw err;
                  });
                }
              });
            userPosts.image = newsImages || userPosts.image;
            const updatedCate = await userPosts.save();
            res.status(201).json(updatedCate);
          } catch (error) {
            throw new Error(error);
          }
        } else {
          try {
            userPosts.image?.length > 0 &&
              userPosts.image.forEach((item) => {
                if (fs.existsSync(fileImageRoot(item))) {
                  fs.unlink(fileImageRoot(item), function (err) {
                    if (err) throw err;
                  });
                }
              });
            userPosts.image = [];
            const updatedNews = await userPosts.save();
            res.status(201).json(updatedNews);
          } catch (error) {
            throw new Error(error);
          }
        }
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
        try {
          userPosts.image?.length > 0 &&
            userPosts.image.forEach((item) => {
              if (fs.existsSync(fileImageRoot(item))) {
                fs.unlink(fileImageRoot(item), function (err) {
                  if (err) throw err;
                });
              }
            });
          res.status(201).json(updatedCate);
        } catch (error) {
          throw new Error(error);
        }
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
newsRoute.post(
  "/branch",
  verifyToken,
  upload.array("newsImgs"),
  expressAsyncHandler(async (req, res) => {
    const newsImages = [];
    if (req.files && req.files.length > 0) {
      req.files.map((item) => newsImages.push(item.filename));
    }
    const Title = "Hệ thống các chi nhánh trên toàn quốc";
    const { MetaKeyword, MetaDes, slug, description } = req.body;
    const newsPost = await News.create({
      title: Title,
      MetaKeyword,
      MetaDes,
      slug,
      description,
      image: newsImages,
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
newsRoute.get(
  "/branch/unique",
  upload.array("newsImgs"),
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.findOne({
      title: "Hệ thống các chi nhánh trên toàn quốc",
    });
    if (userPosts) {
      return res.status(200).json(userPosts);
    } else {
      res.status(401);
      throw new Error("You don't have any posts");
    }
  })
);
newsRoute.put(
  "/branch/unique",
  verifyToken,
  upload.array("newsImgs"),
  expressAsyncHandler(async (req, res) => {
    const userPosts = await News.findOne({
      title: "Hệ thống các chi nhánh trên toàn quốc",
    });
    const { MetaKeyword, MetaDes, slug, description, categories } = req.body;
    if (userPosts) {
      if (
        req.user.isAdmin ||
        userPosts.user.valueOf() === req.user._id.valueOf()
      ) {
        userPosts.MetaKeyword = MetaKeyword || userPosts.MetaKeyword;
        userPosts.MetaDes = MetaDes || userPosts.MetaDes;
        userPosts.slug = slug || userPosts.slug;
        userPosts.description = description || userPosts.description;
        userPosts.categories = categories || userPosts.categories;
        if (req.files && req.files.length > 0) {
          const newsImages = [];
          req.files.map((item) => newsImages.push(item.filename));
          try {
            userPosts.image?.length > 0 &&
              userPosts.image.forEach((item) => {
                if (fs.existsSync(fileImageRoot(item))) {
                  fs.unlink(fileImageRoot(item), function (err) {
                    if (err) throw err;
                  });
                }
              });
            userPosts.image = newsImages || userPosts.image;
            const updatedCate = await userPosts.save();
            res.status(201).json(updatedCate);
          } catch (error) {
            throw new Error(error);
          }
        } else {
          try {
            userPosts.image?.length > 0 &&
              userPosts.image.forEach((item) => {
                if (fs.existsSync(fileImageRoot(item))) {
                  fs.unlink(fileImageRoot(item), function (err) {
                    if (err) throw err;
                  });
                }
              });
            userPosts.image = [];
            const updatedNews = await userPosts.save();
            res.status(201).json(updatedNews);
          } catch (error) {
            throw new Error(error);
          }
        }
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
module.exports = newsRoute;
