const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
const {
  verifyRefreshToken,
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
} = require("../middleware/Authentication.js");
const User = require("../models/UserModel.js");
const {
  generateToken,
  generaterefreshToken,
} = require("../utils/generateTOken.js");
const { upload } = require("./multer.js");
const userRouter = express.Router();
let refreshTokens = [];
//login
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      const refreshToken = generaterefreshToken(user._id);
      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);
//Register
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      if (newUser) {
        const token = generateToken(newUser._id);
        const refreshToken = generaterefreshToken(newUser._id);
        refreshTokens.push(token);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "none",
        });
        res.json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          isAdmin: newUser.isAdmin,
          token: token,
          createdAt: newUser.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  })
);
// REfresh Token
userRouter.post(
  "/refresh",
  expressAsyncHandler(async (req, res) => {
    const refreshToken = req.headers?.cookie?.split("=")[1];
    if (!refreshToken) {
      res.status(400);
      throw new Error("You're not authenticated!!!");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!!!");
    }
    jsonwebtoken.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      (err, id) => {
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        if (id) {
          const newAccessToken = generateToken(id.id);
          const newRefreshToken = generaterefreshToken(id.id);
          refreshTokens.push(newRefreshToken);
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "none",
          });
          res.status(200).json({ token: newAccessToken });
        } else {
          throw new Error(err);
        }
      }
    );
  })
);
//Logout
userRouter.post(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    const refToken = req.headers?.cookie?.split("=")[1];
    refreshTokens = refreshTokens.filter((token) => token !== refToken);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out!");
  })
);
// Get Profile
userRouter.get(
  "/profile",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
//Update Profile
userRouter.put(
  "/profile",
  verifyToken,
  upload.single("avatar"),
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.file ? req.file.filename : user.avatar;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Get ALL USER ADmin
userRouter.get(
  "/",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);
// delete user
userRouter.delete(
  "/:id",
  verifyTokenAndUser,
  expressAsyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json("User has been deleted...");
    } else {
      res.status(500);
      throw new Error();
    }
  })
);
module.exports = userRouter;
