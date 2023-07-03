const app = require("./app");

const connectDatabase = require("./config/database");
// Require the Cloudinary library
var cloudinary = require("cloudinary").v2;
const Razorpay = require("razorpay");

process.on("uncaughtException", (err) => {
  console.log(`ERRor:- ${err.message}`);
  console.log(`server is shuting dawn due to uncaughtException `);
  process.exit(1);
});

// give the path of confing file
if (process.env.NODE_ENV!=="PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//conecting to connectDatabase
connectDatabase();

// exports.instance = new Razorpay({
//   key_id: process.env.YOUR_KEY_ID,
//   key_secret: process.env.YOUR_KEY_SECRET,
// });
// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.CLOUDINARY_URL,
//   api_secret: process.env.api_secret,
// });
cloudinary.config({
  cloud_name: "dbacwthnv",
  api_key: "511772263679235",
  api_secret: process.env. api_secret,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// unhandledRejection Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:-${err.message}`);
  // console.log(`Error:-${err.stack}`);
  console.log("server is shuting dawn due to unhandledRejection");

  server.close(() => {
    process.exit(1);
  });
});
