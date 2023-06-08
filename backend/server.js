const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Require the Cloudinary library
var cloudinary = require('cloudinary').v2;

process.on("uncaughtException", (err) => {
  console.log(`ERRor:- ${err.message}`);
  console.log(`server is shuting dawn due to uncaughtException `);
  process.exit(1);
});

// give the path of confing file
dotenv.config({ path: "backend/config/config.env" });

//conecting to connectDatabase
connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.CLOUDINARY_URL,
//   api_secret: process.env.api_secret,
// });
cloudinary.config({
  cloud_name: 'dbacwthnv', 
  api_key: '511772263679235', 
  api_secret: '0opOgfJbWCdJmdzQHjka-eMjVXc' 
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
