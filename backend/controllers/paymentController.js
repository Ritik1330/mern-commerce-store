const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");
// const { instance } = require("../server");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret:process.env.YOUR_KEY_SECRET,
});

//prosees payment
exports.paymentProcess = cachasycError(async (req, res, next) => {
  // //console.log(req.body.amount)
  const options = {
    amount: req.body.amount * 100, // Amount in paise (e.g., 1000 paise = ₹10)
    currency: "INR",
    // receipt: "order_rcptid_11",
    // payment_capture: 1, // Auto-capture the payment
  };

  try {
    const order = await razorpay.orders.create(options);
    // //console.log(order);
    // return order;
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    //console.error(error);
    res.status(402).json({
      success: false,
      erroe: error,
    });
  }
});

//sent public key
exports.paymentverification = cachasycError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key_id: process.env.YOUR_KEY_ID,
  });
});
