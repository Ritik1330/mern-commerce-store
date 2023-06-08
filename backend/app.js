const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload")
var bodyParser = require('body-parser')
// const cloudinary = require('cloudinary').v2


// / Require the Cloudinary library

app.use(express.json());

// for gate user cooke req.cookie.token
app.use(cookieparser());


app.use(fileUpload());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));





// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
  
//   app.use((err, req, res, next) => {
//     res.locals.error = err;
//     const status = err.status || 500;
//     res.status(status);
//     res.render('error');
//   });

  
//   app.set('view engine', 'ejs');












//route import
const routeproduct = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
app.use("/api/v1", routeproduct);
app.use("/api/v1", user);
app.use("/api/v1", order);

//midelware for error
app.use(errorMiddleware);

module.exports = app;
