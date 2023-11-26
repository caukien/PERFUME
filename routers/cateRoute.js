const Routes = require("express").Router();
const { cateController } = require('../controller/cateController.js');

Routes.post('/admin/postcate', cateController.postCate);
Routes.get("/admin/getcate", cateController.readCate);
Routes.get("/admin/getcate/:id", cateController.readCateid);
Routes.put("/admin/modifycate/:id", cateController.modiCate);
Routes.delete("/admin/deletecate/:id", cateController.deleteCate);

//Get page
Routes.get('/admin/createcate', cateController.createCate)
Routes.get('/admin/modifycate/:id', cateController.modifyCate)

module.exports = Routes;