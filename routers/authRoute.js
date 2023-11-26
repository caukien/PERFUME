const Routes = require("express").Router();

const { authController } = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

Routes.post("/register", authController.registerUser);
Routes.post("/admin/signin", authController.signinUser);

Routes.post("/admin/logout", authController.logoutUser);

// RERSHER

Routes.post("/refresh", authController.requestRefreshToken);

//Get page
Routes.get('/admin', authController.getloginform)
module.exports = Routes;