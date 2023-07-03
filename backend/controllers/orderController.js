const Product = require("../models/productModel");
const Order = require("../models/orderModal");
const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");

//create new ordeo
exports.newOrder = cachasycError(async (req, res, next) => {
  console.log(req.body);
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
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // console.log(req.params .id)
  if (!order) {
    return next(new ErrorHander("order not found with this is", 404));
  }

  res.status(200).json({
    success: true,
    order,
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
  console.log(req.body.status);
  if (!order) {
    return next(new ErrorHander("order not found with this is", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("order is alredy Delivered", 404));
  }
  order.orderStatus = req.body.status;
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.productId, o.quantity);
    });
    console.log("first")
  }

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
    // console.log("11")
    // console.log(order.orderStatus )
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    // orders,
    // totalAmaunt: totalAmaunt,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  // console.log(product.stock);
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
