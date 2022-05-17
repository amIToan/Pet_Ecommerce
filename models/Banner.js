const mongoose = require("mongoose");
const bannerSchema = mongoose.Schema(
  {
    bannerName: { type: String, require: true },
    bannerUrlLink: { type: Array, require: true },
    bannerPosition: { type: Number, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
