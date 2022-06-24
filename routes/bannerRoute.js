const Banner = require("../models/Banner.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin } = require("../middleware/Authentication.js");
const { fileImageRoot, upload } = require("./multer.js");
const fs = require("fs");
const bannerRoute = express.Router();

//get data company
bannerRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const bannerInfo = await Banner.find({});
    if (bannerInfo) {
      res.status(200).json(bannerInfo);
    } else {
      res.status(500);
      throw new Error("Something's wrong!!!");
    }
  })
);
bannerRoute.get(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const bannerInfo = await Banner.findById(req.params.id);
    if (bannerInfo) {
      res.status(200).json(bannerInfo);
    } else {
      res.status(500);
      throw new Error("Something's wrong!!!");
    }
  })
);
bannerRoute.post(
  "/",
  verifyTokenAndAdmin,
  upload.array("bannerUrlLink"),
  asyncHandler(async (req, res) => {
    const { bannerName, bannerPosition } = req.body;
    const bannerImages = [];
    if (req.files && req.files.length > 0) {
      req.files.map((item) => bannerImages.push(item.filename));
    }
    const bannerExist = await Banner.findOne({ bannerName });
    if (bannerExist) {
      res.status(400);
      throw new Error("Banner name already exist");
    } else {
      const newBanner = new Banner({
        bannerName,
        bannerUrlLink: bannerImages,
        bannerPosition,
        user: req.user._id,
      });
      await newBanner.save((error, newBanner) => {
        if (error) return res.status(404).json(error);
        if (newBanner) return res.status(201).json(newBanner);
      });
    }
  })
);
bannerRoute.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.array("bannerUrlLink"),
  asyncHandler(async (req, res) => {
    // console.log(req.body), console.log(req.files);
    const { bannerName, bannerPosition } = req.body;
    const foundBanner = await Banner.findById(req.params.id);
    if (foundBanner) {
      foundBanner.bannerName = bannerName || foundBanner.bannerName;
      foundBanner.bannerPosition = bannerPosition || foundBanner.bannerPosition;
      if (req.files && req.files.length > 0) {
        const bannerImages = [];
        req.files.map((item) => bannerImages.push(item.filename));
        try {
          foundBanner.bannerUrlLink?.length > 0 &&
            foundBanner.bannerUrlLink.forEach((item) => {
              if (fs.existsSync(fileImageRoot(item))) {
                fs.unlink(fileImageRoot(item), function (err) {
                  if (err) throw err;
                });
              }
            });
          foundBanner.bannerUrlLink = bannerImages || foundBanner.bannerUrlLink;
          const updateBanner = await foundBanner.save();
          res.status(201).json(updateBanner);
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      } else {
        try {
          foundBanner.bannerUrlLink?.length > 0 &&
            foundBanner.bannerUrlLink.forEach((item) => {
              if (fs.existsSync(fileImageRoot(item))) {
                fs.unlink(fileImageRoot(item), function (err) {
                  if (err) throw err;
                });
              }
            });
          foundBanner.bannerUrlLink = [];
          const updateBanner = await foundBanner.save();
          res.status(201).json(updateBanner);
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      }
    } else {
      res.status(500);
      throw new Error("Something's wrong!!!");
    }
  })
);
module.exports = bannerRoute;
