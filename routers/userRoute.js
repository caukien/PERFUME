const Routes = require("express").Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { userController } = require("../controller/userController");

Routes.get("/admin/getuser", userController.getAllUser);
Routes.get("/admin/getuser/:id", userController.getUserByID);
Routes.delete("/admin/deleteuser/:id", userController.deteleUser);
Routes.put("/admin/updateuser/:id", userController.updateUser);

//Get page
// Routes.get('/modifyuser', userController)

module.exports = Routes;
