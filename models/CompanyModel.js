const mongoose = require("mongoose");
const companySchema = mongoose.Schema(
  {
    companyName: { type: String, required: true },
    ico: { type: String, default: null },
    logoHeader: { type: String, required: false, default: null },
    phoneNumber: { type: String },
    Hotline: { type: String },
    Address: { type: String },
    Bank: { type: String },
    bankOwner: { type: String },
    bankAccount: { type: Number },
    Email: {
      type: String,
    },
    pageTitle: { type: String },
    metaDes: { type: String },
    metaKeys: { type: String },
    ggAnal: { type: String },
    Facebook: { type: String },
    Youtube: { type: String },
    Instagram: { type: String },
    Zalo: { type: String },
    footerTitle: { type: String },
    Introduction: { type: String },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
