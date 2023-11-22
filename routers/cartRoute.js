const { cartController } = require("../controller/cartController");
const routes = require("express").Router();

routes.post('/createcart', cartController.createCart);
routes.get('/cart', cartController.getCart);
routes.get('/getallcart/:id', cartController.getCartbyId);
routes.put('/modifycart/:id', cartController.updateCart);
routes.delete('/deletecart/:id', cartController.deleteCart);

module.exports = routes;