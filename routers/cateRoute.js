const Routes = require("express").Router();
const { cateController } = require('../controller/cateController.js');
const session = require('../middleware/session.js')

Routes.post('/admin/postcate', session.isAuth, cateController.postCate);
Routes.get("/admin/getcate", session.isAuth,cateController.readCate);
Routes.get("/admin/getcate/:id", session.isAuth,cateController.readCateid);
Routes.put("/admin/modifycate/:id", session.isAuth, cateController.modiCate);
Routes.delete("/admin/deletecate/:id", session.isAuth, cateController.deleteCate);

//Get page
Routes.get('/admin/createcate', session.isAuth, cateController.createCate)
Routes.get('/admin/modifycate/:id', session.isAuth, cateController.modifyCate)

module.exports = Routes;