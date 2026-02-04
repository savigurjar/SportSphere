const express = require("express");
const authRouter = express.Router();
const { signupUser, loginUser, getProfile, logoutUser, adminRegister, changePassword, forgotPassword, resetPassword, getAllUsers, deleteProfile } = require("../controllers/userController");
const userMiddleware = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.get("/getProfile", userMiddleware, getProfile)
authRouter.post("/logout", userMiddleware, logoutUser)
authRouter.post('/admin/signup', adminMiddleware, adminRegister)
// change password
authRouter.post('/change-password', userMiddleware, changePassword);
// forgot password
authRouter.post('/forgot-password', forgotPassword);
// reset password
authRouter.post('/reset-password/:token', resetPassword);  // kebab-case
authRouter.get('/admin/users', adminMiddleware, getAllUsers);
// delete profile
authRouter.delete('/deleteProfile', userMiddleware, deleteProfile)

module.exports = authRouter;