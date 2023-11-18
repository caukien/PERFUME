const Routes = require("express").Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { userController } = require("../controller/userController");

Routes.get("/getuser", userController.getAllUser);
Routes.get("/getuser/:id", userController.getUserByID);
Routes.delete("/deleteuser/:id", userController.deteleUser);
Routes.put("/updateuser/:id", userController.updateUser);

//Get page
// Routes.get('/modifyuser', userController)

module.exports = Routes;
