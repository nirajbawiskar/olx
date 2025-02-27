const { loginAdmin, verifyAdminOTP, logoutAdmin, registerUser, loginUser, logoutUser, registerAdmin } = require("../controller/auth.controller")

const router = require("express").Router()
router
    // .post("/register-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .post("/verifyOtp-admin", verifyAdminOTP)
    .post("/logout-admin", logoutAdmin)

    .post("/user-register", registerUser)
    .post("/user-login", loginUser)
    .post("/user-logout", logoutUser)
module.exports = router

