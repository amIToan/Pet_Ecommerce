const mongoose = require("mongoose");
const DiscountSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
