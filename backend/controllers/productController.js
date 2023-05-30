const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");
const Apifeatures = require("../utils/apifeatures");
const { findById } = require("../models/usersModal");

//create product --admin

exports.createProduct = cachasycError(async (req, res, next) => {
  // console.log(req.body.id)
  console.log(req.body.id);

  req.body.user = req.user.id;
  console.log("ritik");
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// update product---admin

exports.updateproduct = cachasycError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      Message: "product not found",
    });
  } else {
    const Products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      Products,
    });
  }
});

// delete product---admin

exports.deleteproducts = cachasycError(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  console.log(`delete${product}`);
  if (!product) {
    res.status(500).json({
      success: false,
      Message: "product not found",
    });
  } else {
    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      Message: "product has deleted ",
    });
  }
});

//get all product

exports.getAllproducts = cachasycError(async (req, res, next) => {
  // return next(new ErrorHander("product not found+ asdfghjkl", 404));

  const resultperpage = 10;
  const Apifeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  // const resultperpage =5;
  const productcount = await Product.countDocuments();
  const products = await Apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productcount,
  });
});

//get single product

exports.getproductDetails = cachasycError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("product not found+", 404));
    // res.status(500).json({
    //     success: false,
    //     Message: "product not found"

    // })
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// create  and update review

exports.createProductReview = cachasycError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isRevied = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isRevied) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.NumberofReviews = product.reviews.length;
  }

  let total = 0;

  product.reviews.forEach((rev) => {
    total += rev.rating;
  });

  product.ratings = total / product.reviews.length;

  // console.log(product.ratings, product.reviews.length)

  await product.save({ runValidators: false });

  res.status(200).json({
    success: true,
    product,
  });
});

// gate product review

exports.getproductReview = cachasycError(async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("product not found+", 404));
  } else {
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
});

// deleteproductsReview by this user

exports.deleteproductsReview = cachasycError(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("product not found+", 404));
  }

  let reviews = await product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  console.log(reviews);
  let NumberofReviews = reviews.lengt;

  let total = 0;
  reviews.forEach((rev) => {
    total += rev.rating;
  });

  let ratings = total / product.reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    NumberofReviews,
    ratings,
  });

  res.status(200).json({
    success: true,
    reviews: reviews,
  });
});
