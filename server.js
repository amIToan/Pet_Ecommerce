var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var connectDatabase = require("./config/MongoDB.js");
var { notFound, errorHandler } = require("./middleware/Erros.js");
// var ImportData = require("./Dataimport.js");
var userRouter = require("./routes/userRoute.js");
var categoryRouter = require("./routes/categoryRoute.js");
var productRoute = require("./routes/productRoute.js");
var newsRoute = require("./routes/newsRoute.js");
var orderRouter = require("./routes/orderRoute.js");
var companyRoute = require("./routes/companyRoute.js");
var bannerRoute = require("./routes/bannerRoute.js");
var cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    credentials: true,
    // origin: ["http://localhost:5000", "http://localhost:3000"],
  })
);
//test nodeiis
app.get("/testing", (re, res) => {
  res.send("Hello world")
})
app.use(express.json());
app.use(cookieParser());
connectDatabase();
// API
app.use(express.static("uploaded_Images"));
app.use("/Images", express.static("uploaded_Images"));
// app.use("/api/import", ImportData);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRoute);
app.use("/api/news", newsRoute);
app.use("/api/orders", orderRouter);
app.use("/api/company", companyRoute);
app.use("/api/banner", bannerRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);
//run port
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
