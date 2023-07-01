const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");
const Apifeatures = require("../utils/apifeatures");
const { findById } = require("../models/usersModal");
var cloudinary = require("cloudinary").v2;

//create product --admin

exports.createProduct = cachasycError(async (req, res, next) => {
  if (req.body.images===undefined) {
    return next(new ErrorHander("product image is requrid", 401));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    let myCloud = null;
    if (images.length === 1) {
      myCloud = await cloudinary.uploader.upload(req.body.images, {
        folder: "products",
      });
    } else {
      myCloud = await cloudinary.uploader.upload(req.body.images[i], {
        folder: "products",
      });
    }

    imagesLink.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });
  }
  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// update product---admin

exports.updateproduct = cachasycError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  let images = [];
  imagesLink = [];
  if (!product) {
    res.status(500).json({
      success: false,
      Message: "product not found",
    });
  }
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      const imageId = product.images[i].public_id;
      await cloudinary.uploader.destroy(imageId);
    }

    for (let i = 0; i < images.length; i++) {
      let myCloud = null;
      if (images.length === 1) {
        myCloud = await cloudinary.uploader.upload(req.body.images, {
          folder: "products",
        });
      } else {
        myCloud = await cloudinary.uploader.upload(req.body.images[i], {
          folder: "products",
        });
      }

      imagesLink.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }
    req.body.images = imagesLink;
  }
  // req.body.user = req.user.id;
  const Products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    Products,
  });
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
    for (let i = 0; i < product.images.length; i++) {
      const imageId = product.images[i].public_id;
      await cloudinary.uploader.destroy(imageId);
    }
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
  const productcount = await Product.countDocuments();
  const Apifeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await Apifeature.query.clone();
  let filterdProductCount = products.length;

  Apifeature.pagination(resultperpage);

  products = await Apifeature.query;

  res.status(200).json({
    success: true,
    products,
    productcount,
    resultperpage,
    filterdProductCount,
  });
});
//get all product by admin

exports.getAdminproducts = cachasycError(async (req, res, next) => {
  // return next(new ErrorHander("product not found+ asdfghjkl", 404));

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
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
