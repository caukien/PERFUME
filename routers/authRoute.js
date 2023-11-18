const Routes = require("express").Router();

const { authController } = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

Routes.post("/register", authController.registerUser);
Routes.post("/login", authController.signinUser);

Routes.post("/logout", authController.logoutUser);

// RERSHER

Routes.post("/refresh", authController.requestRefreshToken);

//Get page
module.exports = Routes;