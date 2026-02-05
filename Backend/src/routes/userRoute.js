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

authRouter.get("/check", userMiddleware, (req, res) => {
  try {
    const user = req.result;
    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      role: user.role,
      
    }
    res.status(200).json({
      user: reply,
      message: "Valid User"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = authRouter;