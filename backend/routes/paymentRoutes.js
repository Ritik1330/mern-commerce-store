const express = require("express");
const {
  // publicstripeapikey,
  paymentProcess,
  paymentverification
} = require("../controllers/paymentController");
const { isAuthentictedUser, authrizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/user").get(getAllproducts)

// router.route("/stripeapikey").get(isAuthentictedUser, publicstripeapikey);
router.route("/payment/process").post(isAuthentictedUser, paymentProcess);
router.route("/payment/verification").get(isAuthentictedUser, paymentverification);

module.exports = router;
