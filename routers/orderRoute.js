const { orderController } = require('../controller/orderController');
const route = require('express').Router();

route.post('/createorder', orderController.createOrder);
route.get('/getorder', orderController.getallOrder);
route.get('/getorder/:id', orderController.getbyidorder);
route.put('/modifyorder/:id', orderController.updateOrder);

module.exports = route;