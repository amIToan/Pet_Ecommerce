const mongoose = require("mongoose");
const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categories: [{ type: mongoose.Schema.Types.String, ref: "Category" }],
  },
  {
    timestamps: true,
  }
);
const News = mongoose.model("News", newsSchema);
module.exports = News;
