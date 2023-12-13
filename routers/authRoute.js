const Routes = require("express").Router();

const { authController } = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const session = require('../middleware/session.js')

Routes.post("/register", authController.registerUser);
Routes.post("/admin/signin", authController.signinUser);

Routes.post("/admin/logout", authController.logoutUser);

// RERSHER

Routes.post("/refresh", authController.requestRefreshToken);

//Get page
Routes.get('/admin', authController.getloginform)

//Get page for client
Routes.get('/account', authController.loginform4user)

module.exports = Routes;