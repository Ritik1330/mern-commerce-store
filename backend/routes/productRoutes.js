const express = require("express")
const { getAllproducts ,createProduct,updateproduct,deleteproducts,getproductDetails,
    createProductReview,getproductReview,deleteproductsReview ,getAdminproducts,getError} = require("../controllers/productController")

const { isAuthentictedUser ,authrizeRoles,} = require("../middleware/auth")
// const { getAllproducts,createProduct,updateproduct,deleteproducts,getproductDetails } = require("../controllers/productcontrollers")



const router =express.Router()

// router.route("/isAuthentictedUser").get(isAuthenticstedUser)
router.route("/products").get( getAllproducts)
// router.route("/products").delete( getAllproducts)


router.route("/admin/product/new").post(isAuthentictedUser,authrizeRoles("admin"),createProduct)
router.route("/admin/products").get(isAuthentictedUser,authrizeRoles("admin"),getAdminproducts)
router.route("/admin/product/:id").put(isAuthentictedUser,authrizeRoles("admin"),updateproduct)
router.route("/admin/product/:id").delete(isAuthentictedUser,authrizeRoles("admin"),deleteproducts)
router.route("/product/:id").get(getproductDetails)
router.route("/review").put(isAuthentictedUser,createProductReview)
router.route("/reviews").get(isAuthentictedUser,getproductReview)
router.route("/reviews").delete(isAuthentictedUser,deleteproductsReview)
router.route("/error").get(getError)

module.exports= router