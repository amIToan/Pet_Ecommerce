const Company = require("../models/CompanyModel.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/Authentication.js");
const { fileImageRoot, upload } = require("./multer.js");
const fs = require("fs");
const companyRoute = express.Router();
//get data company
companyRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const companyInfo = await Company.find({});
    if (companyInfo) {
      res.status(200).json(companyInfo);
    } else {
      res.status(500);
      throw new Error("Something's wrong!!!");
    }
  })
);
companyRoute.post(
  "/",
  verifyTokenAndAdmin,
  upload.single("logoHeader"),
  asyncHandler(async (req, res) => {
    const {
      companyName,
      phoneNumber,
      Hotline,
      Address,
      Bank,
      bankOwner,
      bankAccount,
      Email,
      pageTitle,
      metaDes,
      metaKeys,
      ggAnal,
      Facebook,
      Youtube,
      Instagram,
      Zalo,
      footerTitle,
      Introduction,
    } = req.body;
    const companyInfo = await Company.create({
      companyName,
      phoneNumber,
      Hotline,
      Address,
      Bank,
      bankOwner,
      bankAccount,
      Email,
      pageTitle,
      metaDes,
      metaKeys,
      ggAnal,
      Facebook,
      Youtube,
      Instagram,
      Zalo,
      footerTitle,
      Introduction,
      logoHeader: req.file ? req.file.filename : null,
    });
    if (companyInfo) {
      res.status(201).json(companyInfo);
    } else {
      res.status(400);
      throw new Error("Something's wrong!!!");
    }
  })
);

companyRoute.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.single("logoHeader"),
  asyncHandler(async (req, res) => {
    const {
      companyName,
      phoneNumber,
      Hotline,
      Address,
      Bank,
      bankOwner,
      bankAccount,
      Email,
      pageTitle,
      metaDes,
      metaKeys,
      ggAnal,
      Facebook,
      Youtube,
      Instagram,
      Zalo,
      footerTitle,
      Introduction,
    } = req.body;
    const foundCompany = await Company.findById(req.params.id);
    if (foundCompany) {
      foundCompany.companyName = companyName || foundCompany.companyName;
      foundCompany.phoneNumber = phoneNumber || foundCompany.phoneNumber;
      foundCompany.Hotline = Hotline || foundCompany.Hotline;
      foundCompany.Address = Address || foundCompany.Address;
      foundCompany.Bank = Bank || foundCompany.Bank;
      foundCompany.bankOwner = bankOwner || foundCompany.bankOwner;
      foundCompany.bankAccount = bankAccount || foundCompany.bankAccount;
      foundCompany.Email = Email || foundCompany.Email;
      foundCompany.pageTitle = pageTitle || foundCompany.pageTitle;
      foundCompany.metaDes = metaDes || foundCompany.metaDes;
      foundCompany.metaKeys = metaKeys || foundCompany.metaKeys;
      foundCompany.ggAnal = ggAnal || foundCompany.ggAnal;
      foundCompany.Facebook = Facebook || foundCompany.Facebook;
      foundCompany.Youtube = Youtube || foundCompany.Youtube;
      foundCompany.Instagram = Instagram || foundCompany.Instagram;
      foundCompany.Zalo = Zalo || foundCompany.Zalo;
      foundCompany.footerTitle = footerTitle || foundCompany.footerTitle;
      foundCompany.Introduction = Introduction || foundCompany.Introduction;
      if (req.file?.filename) {
        try {
          if (fs.existsSync(fileImageRoot(foundCompany.logoHeader))) {
            fs.unlink(fileImageRoot(foundCompany.logoHeader), function (err) {
              if (err) throw err;
              console.log("File deleted!");
            });
          }
          foundCompany.logoHeader = req.file
            ? req.file.filename
            : foundCompany.logoHeader;
          const updatedCompany = await foundCompany.save();
          res.status(201).json(updatedCompany);
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          if (fs.existsSync(fileImageRoot(foundCompany.logoHeader))) {
            fs.unlink(fileImageRoot(foundCompany.logoHeader), function (err) {
              if (err) throw err;
              console.log("File deleted!");
            });
          }
          foundCompany.logoHeader = req.file
            ? req.file.filename
            : foundCompany.logoHeader;
          const updatedCompany = await foundCompany.save();
          res.status(201).json(updatedCompany);
        } catch (error) {
          console.error(err);
        }
      }
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
module.exports = companyRoute;
