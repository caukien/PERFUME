const express = require('express');
const { productController } = require('../controller/productController');
const routes = express.Router();
const upload = require('../middleware/upload.js');
// const uploadOptions = multer({ storage: upload })

// Phương thức: Tạo sản phẩm mới
routes.post('/createproduct', upload.single('image'), productController.postProduct);

// Phương thức: Lấy tất cả sản phẩm
routes.get('/getproduct', productController.getProduct);

// Phương thức: Lấy sản phẩm bằng ID
routes.get('/getproduct/:id', productController.getProductId);

// Phương thức: Cập nhật sản phẩm bằng ID
routes.put('/updateproduct/:id', upload.single('image'), productController.updateProduct);

// Phương thức: Xóa sản phẩm bằng ID
routes.delete('/deleteproduct/:id', productController.deleteProduct);

//Get page for admin
routes.get('/createproduct', productController.createproduct)
routes.get('/modifyproduct/:id', productController.modifyProduct)
//Get page for client
routes.get('/index', productController.get2homepage)
routes.get('/product', productController.get2Product);
routes.get('/product/:id', productController.get2ProductId);

module.exports = routes;
