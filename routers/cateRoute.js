const Routes = require("express").Router();
const { cateController } = require('../controller/cateController.js');

Routes.post('/createcate', cateController.postCate);
Routes.get("/getcate", cateController.readCate);
Routes.get("/getcate/:id", cateController.readCateid);
Routes.put("/modifycate/:id", cateController.modiCate);
Routes.delete("/deletecate/:id", cateController.deleteCate);

//Get page
Routes.get('/createcate', cateController.createCate)
Routes.get('/modifycate/:id', cateController.modifyCate)

module.exports = Routes;