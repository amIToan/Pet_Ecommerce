const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: false,
        default: null,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    size: { type: Array, required: false, default: null },
    color: { type: Array, required: false, default: null },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    Type: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
