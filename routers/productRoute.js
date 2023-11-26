const express = require('express');
const { productController } = require('../controller/productController');
const routes = express.Router();
const upload = require('../middleware/upload.js');
// const uploadOptions = multer({ storage: upload })

// Phương thức: Tạo sản phẩm mới
routes.post('/admin/createproduct', upload.single('image'), productController.postProduct);

// Phương thức: Lấy tất cả sản phẩm
routes.get('/admin/getproduct', productController.getProduct);

// Phương thức: Lấy sản phẩm bằng ID
routes.get('/admin/getproduct/:id', productController.getProductId);

// Phương thức: Cập nhật sản phẩm bằng ID
routes.put('/admin/updateproduct/:id', upload.single('image'), productController.updateProduct);

// Phương thức: Xóa sản phẩm bằng ID
routes.delete('/admin/deleteproduct/:id', productController.deleteProduct);

//Get page for admin
routes.get('/admin/createproduct', productController.createproduct)
routes.get('/admin/modifyproduct/:id', productController.modifyProduct)
//Get page for client
routes.get('/index', productController.get2homepage)
routes.get('/product', productController.get2Product);
routes.get('/product/:id', productController.get2ProductId);
routes.get('/:catename', productController.get2ProductbyCate);

module.exports = routes;
