const jsonwebtoken = require("jsonwebtoken");

const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};
const generaterefreshToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "30d",
  });
};
module.exports = { generateToken, generaterefreshToken };
