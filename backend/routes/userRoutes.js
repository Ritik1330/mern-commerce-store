const express = require("express")
const { registerUser, loginUser, logoutUser, forgatepasswort, resetepasswort
    , getUserDetails, updatePassword, updateProfile, getAllUser, getSingalUser,
    updateUserRole, deleteUser } = require("../controllers/userController")
const { isAuthentictedUser, authrizeRoles } = require("../middleware/auth")




const router = express.Router()

// router.route("/user").get(getAllproducts)


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/password/forgate/").post(forgatepasswort)
router.route("/password/reset/:token").put(resetepasswort)
router.route("/logout").get(logoutUser)
router.route("/me").get(isAuthentictedUser, getUserDetails)
router.route("/password/update").put(isAuthentictedUser, updatePassword)
router.route("/me/update").put(isAuthentictedUser, updateProfile)
router.route("/admin/users").get(isAuthentictedUser, authrizeRoles("admin"), getAllUser)
router.route("/admin/user/:id").get(isAuthentictedUser, authrizeRoles("admin"), getSingalUser)
router.route("/admin/user/:id").put(isAuthentictedUser, authrizeRoles("admin"), updateUserRole)
router.route("/admin/user/:id").delete(isAuthentictedUser, authrizeRoles("admin"), deleteUser)
// router.route("/user/:id").put(updateproduct)
// router.route("/user/:id").delete(deleteproducts)
// router.route("/user/:id").get(getproductDetails)


module.exports = router