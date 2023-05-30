const express = require("express");
const { isAuthentictedUser, authrizeRoles } = require("../middleware/auth");
const {
  newOrder,
  myOrder,
  getSingalOrder,
  getallOrder,
  deleteorder,
  updateOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthentictedUser, newOrder);
router.route("/order/:id").get(isAuthentictedUser, getSingalOrder);
router.route("/orders/me").get(isAuthentictedUser, myOrder);
router.route("/admin/orders").get(isAuthentictedUser, authrizeRoles("admin"), getallOrder);
// router.route("orders").get(isAuthentictedUser, getallOrder);
router.route("/admin/order/:id").put(isAuthentictedUser, authrizeRoles("admin"), updateOrder);
router.route("/admin/order/:id").delete(isAuthentictedUser, authrizeRoles("admin"), deleteorder);

// router.route("admin/orders").get(isAuthentictedUser,authrizeRoles("admin"), myOrder);
// router.route("/orders/me").get(isAuthentictedUser, deleteorder);

module.exports = router;
