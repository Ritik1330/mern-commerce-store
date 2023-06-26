const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");
// const { instance } = require("../server");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_hfSumcQYoN8tqo",
  key_secret: "knIDIiQiLLwpVrqD0H4ARqYm",
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//prosees payment
exports.paymentProcess = cachasycError(async (req, res, next) => {
  // console.log(req.body.amount)
  const options = {
    amount: req.body.amount*100, // Amount in paise (e.g., 1000 paise = ₹10)
    currency: "INR",
    // receipt: "order_rcptid_11",
    // payment_capture: 1, // Auto-capture the payment
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order);
    // return order;
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      success: false,
      erroe: error,
    });
  }
});

//sent public key
exports.paymentverification = cachasycError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeapikey: process.env.STRIPE_API_KEY,
  });
});

// //prosees payment
// exports.paymentProcess = cachasycError(async (req, res, next) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "usd",
//     payment_method_types: ["card"],
//     metadata: {
//       company: "Ecommerce",
//     },
//   });
//   console.log(paymentIntent)

//   res.status(200).json({
//     success: true,
//     client_secret: paymentIntent.client_secret,
//   });
// });

// //sent public key
// exports.publicstripeapikey = cachasycError(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     stripeapikey: process.env.STRIPE_API_KEY,
//   });
// });
