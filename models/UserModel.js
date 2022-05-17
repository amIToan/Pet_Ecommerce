const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      require: false,
      default: null
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//Login
userSchema.methods.matchPassword = async function (enterPass) {
  return await bcryptjs.compare(enterPass, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) { // nếu mà không bị chỉnh sửa thì mới nhảy vào các dùng code
  //   console.log(this.isModified("password"), "vao trong roi");
  //   next();
  // } 
  // const salt = await bcryptjs.genSalt(10);
  // this.password = await bcryptjs.hash(this.password, salt);
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  if (this.avatar == null) {
    this.avatar = "avatar.jpg"
  }
  next();
});
const User = mongoose.model("Users", userSchema);
module.exports = User;
