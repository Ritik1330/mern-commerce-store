const Product = require("../models/productModel");
const Order = require("../models/orderModal");
const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");

//create new ordeo
exports.newOrder = cachasycError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    pymentInfo,
    itemsPrise,
    texPrise,
    shippingPrise,
    totalPrise,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    pymentInfo,
    itemsPrise,
    texPrise,
    shippingPrise,
    totalPrise,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    Success: true,
    order,
  });
});

// get order detailes

exports.getSingalOrder = cachasycError(async (req, res, next) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // console.log(req.params .id)
  if (!orders) {
    return next(new ErrorHander("order not found with this is", 404));
  }

  res.status(200).json({
    success: true,
    orders,
    // "totalAmaunt":totalAmaunt
  });
});

// get logd in user order

exports.myOrder = cachasycError(async (req, res, next) => {
  console.log();
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    order,
  });
});

// get all orders

exports.getallOrder = cachasycError(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new ErrorHander("order not found with this is", 404));
  }

  let totalAmaunt = 0;
  const total = orders.find((order) => {
    totalAmaunt += order.totalPrise;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmaunt: totalAmaunt,
  });
});

// update order status by (admin)

exports.updateOrder = cachasycError(async (req, res, next) => {
  // const o = await Product.findById()
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("order not found with this is", 404));
  }

  if (!order.ordetStatus === "Delivered") {
    return next(new ErrorHander("oorder is alredy dilevarde", 404));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quntitiy);
  });

  order.ordetStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    // orders,
    // totalAmaunt: totalAmaunt,
  });
});

async function updateStock(id, quntitiy) {
  const product = await Product.findById(id);
  // console.log(quntitiy)
  // console.log(id)
  // console.log(product)

  // console.log( product.stock)

  product.stock -= quntitiy;
  console.log(product.stock);
  product.save({ validateBeforeSave: false });
}

// delete order
exports.deleteorder = cachasycError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("order not found with this is", 404));
  }

  await Order.findByIdAndRemove(req.params.id);
  // await order.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
  });
});
