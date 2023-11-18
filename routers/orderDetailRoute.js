const routes = require('express').Router();
const { orderDetailController } = require("../controller/order_detailController.js");

routes.post('/createorderdetail', orderDetailController.createOrderDetail);
routes.get('/getallorderdetail', orderDetailController.getAllOrderDetails);
routes.get('/getallorderdetail/:id', orderDetailController.getAllOrderDetails);
routes.delete('/deleteorderdetail', orderDetailController.deleteOrderDetail);

module.exports = routes;
