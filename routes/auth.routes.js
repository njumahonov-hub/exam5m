const {Router} = require("express")
const { registr, login, resendOtp, forgotPassword, verify, logout} = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh-token")
const authValidatorMidlleware = require("../middleware/auth.-validator.midlleware")


const authRoutes = Router()

authRoutes.post("/register", authValidatorMidlleware,  registr)
authRoutes.post("/verify", verify)
authRoutes.post("/login", login)
authRoutes.get("/refresh",  refreshToken)
authRoutes.get("/logout", logout)
authRoutes.post("/resend", resendOtp)
authRoutes.post("/forgot_password", forgotPassword)

module.exports = authRoutes