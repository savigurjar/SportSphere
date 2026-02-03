const express = require("express");
const authRouter = express.Router();
const { signupUser, loginUser, getProfile,logoutUser } = require("../controllers/userController");
userMiddleware = require("../middleware/userMiddleware")

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.get("/getProfile",userMiddleware,getProfile)
authRouter.post("/logout",userMiddleware,logoutUser)

module.exports = authRouter;