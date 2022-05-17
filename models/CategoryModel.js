const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    slug: { type: String, default: null },
    categoryImage: { type: String, default: null },
    order: { type: Number },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Category",
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
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
