const Routes = require("express").Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { userController } = require("../controller/userController");
const session = require('../middleware/session.js')

Routes.get("/admin/getuser", session.isAuth,userController.getAllUser);
Routes.get("/admin/getuser/:id", session.isAuth, userController.getUserByID);
Routes.delete("/admin/deleteuser/:id", session.isAuth,userController.deteleUser);
Routes.put("/admin/updateuser/:id", session.isAuth, userController.updateUser);

//Get page
// Routes.get('/modifyuser', userController)

module.exports = Routes;
