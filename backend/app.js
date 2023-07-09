const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var path = require("path");
// const cloudinary = require('cloudinary').v2

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// / Require the Cloudinary library

app.use(express.json());

// for gate user cooke req.cookie.token
app.use(cookieparser());

app.use(fileUpload());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

//route import
const routeproduct = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");
app.use("/api/v1", routeproduct);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//midelware for error
app.use(errorMiddleware);
//add frountend
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
module.exports = app;
