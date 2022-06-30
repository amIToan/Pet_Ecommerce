const jsonwebtoken = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/UserModel.js");
const {
  generateToken,
  generaterefreshToken,
} = require("../utils/generateTOken.js");
const verifyToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1]
  ) {
    token = req.headers.authorization.split(" ")[1];
    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, id) => {
      if (id) {
        req.user = await User.findById(id.id).select("-password");
        next();
      }
      if (err) {
        res.status(500).json("Not authorized, token failed");
      }
    });
  } else {
    res.status(500).json("Not authorized, token failed");
  }
});
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id.valueOf() === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You don't have the permission to do that!");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};
const verifyRefreshToken = expressAsyncHandler(async (req, res, next) => {
  // Take refreshToken from Users
  const refreshToken = req.cookies.refreshToken;
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
          sameSite: "strict",
        });
        res.status(200).json({ token: newAccessToken });
        next();
      } else {
        throw new Error(err);
      }
    }
  );
});
module.exports = {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndAdmin,
  verifyRefreshToken,
};
