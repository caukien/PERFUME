const { Product }  = require('../models/productModel.js'); // Import model Product
const  Cates  = require('../models/cateModel.js')
const path = require('path');
const fs = require('fs');


exports.productController = {
    /*
    *Render len trang homepage
    */
    get2homepage: async(req, res) =>{
        try {
            const randomSkip = Math.floor(Math.random() * 0.9);
            const list = await Product.aggregate([
                { $sample: { size: 4 } }, // Lấy ngẫu nhiên 10 bản ghi
                { $skip: randomSkip }, // Bắt đầu từ vị trí ngẫu nhiên được tạo
            ]);
            // return res.json(list)
            res.render("../views/client/index", {
                data: list
            })
        } catch (error) {
            return res.send(error)
        }
    },
    /*
    *Render len trang client: product
    */
    get2Product: async(req, res) =>{
        try {
            let perPage = 8;
            let page = req.query.page || 1;
            const count = await Product.countDocuments({});
            const products = await Product.find().skip(perPage * page - perPage)
                                                .limit(perPage)
                                                .exec();
            const catelist = await Cates.find();
            // if(!products){
            //     res.status(400).json({message: "Không có sản phẩm" });
            //     return;
            // }
            // res.status(200).json(products);
            res.render("../views/client/product", {
                data: products,
                catelist: catelist,
                current: page, 
                // totalPages,
                pages: Math.ceil(count / perPage),
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    /*
    *Hien thi SP theo hang
    */
    get2ProductbyCate: async(req, res) =>{
        try {
            let perPage = 8;
            let page = req.query.page || 1;
            const count = await Product.countDocuments({});
            const { catename } = req.params
            // if (catename === 'Default') {
            //     // Truy vấn để lấy tất cả sản phẩm
            //     const allProducts = await Product.find({}).skip(perPage * page - perPage)
            //                                             .limit(perPage)
            //                                             .exec();
            //     return res.render('../views/client/product', { 
            //         data: allProducts,
            //         catelist: catelist,
            //         current: page, 
            //         // totalPages,
            //         pages: Math.ceil(count / perPage),
            //     });
            // }
            const category = await Cates.findOne({ name: catename });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            const product = await Product.find({ cateid: category }).skip(perPage * page - perPage)
                                                                        .limit(perPage)
                                                                        .exec();
            const catelist = await Cates.find();
            res.render("../views/client/product", {
                data: product,
                catelist: catelist,
                current: page, 
                // totalPages,
                pages: Math.ceil(count / perPage),
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    get2ProductId: async(req, res) =>{
        try {
            const product = await Product.findById(req.params.id)
                                        .populate("cateid", ['name'])
                                        .exec();
            const randomSkip = Math.floor(Math.random() * 0.9);
            const list = await Product.aggregate([
                { $sample: { size: 8 } }, // Lấy ngẫu nhiên 8 bản ghi
                { $skip: randomSkip }, // Bắt đầu từ vị trí ngẫu nhiên được tạo
            ]);
            if (!product) {
                res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.render("../views/client/product-detail", {
                    data: product,
                    related: list
                });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getProduct: async(req, res) =>{
        // const pageNumber = parseInt(req.query.pageNumber) || 1;
        // const pageSize = 2; // Số lượng bản ghi trên mỗi trang
        try {
            // let totalRecords = await Product.countDocuments({});
            // let totalPages = Math.ceil(totalRecords / pageSize);
            // const records = await Product.find().populate("cateid", ['name'])
            //     .skip((pageNumber - 1) * pageSize)
            //     .limit(pageSize)
            //     .exec();
            let perPage = 5;
            let page = req.query.page || 1;
            const count = await Product.countDocuments({});
            const products = await Product.find().populate("cateid", ['name'])
                                                .sort({ createdAt: -1 })
                                                .skip(perPage * page - perPage)
                                                .limit(perPage)
                                                .exec(); 
            // if(!products){
            //     res.status(400).json({message: "Không có sản phẩm" });
            //     return;
            // }
            // res.status(200).json(products);
            res.render("../views/admin/product/index", {
                data: products,
                current: page, 
                // totalPages,
                pages: Math.ceil(count / perPage),
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getProductId: async(req, res) =>{
        try {
            const product = await Product.findById(req.params.id).populate("cateid", 'name');
            if (!product) {
                res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.render("../views/client/product-detail", {
                    data: product
                });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    createproduct: async(req, res) => {
        try {
            const catelist = await Cates.find();
            res.render("../views/admin/product/add", {
                array: catelist
            })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
    postProduct: async (req, res) => {
            try {
            const newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                cateid: req.body.cateid,
                qty: req.body.qty,
                cap: req.body.cap,
                des: req.body.des,
                // image: req.file.filename
            });
            // // if(req, files){
            // //     let path = '';
            // //     req.files.forEach(function(files, index, arr){
            // //         path = path + files.path + ','
            // //     })
            // //     path = path.substring(0, path.lastIndexOf(","))
            // //     newProduct.image = path
            // // }
            if(req.file){
                newProduct.image = req.file.path
            }
            await newProduct.save();
            // res.status(201).json(savedProduct);
            res.redirect("/admin/getproduct");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    modifyProduct: async(req, res) =>{
        try {
            const catelist = await Cates.find();
            let product = await Product.findById(req.params.id)
            res.render("../views/admin/product/edit", {
                array: catelist,
                product: product
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    //////////////////
    updateProduct: async(req, res) =>{
        try {
            let new_image = '';
            if(req.file){
                new_image = req.file.path
                try {
                    fs.unlink('image' + req.body.old_image)
                } catch (error) {
                    return res.status(500).json(error.message)
                }
            }else{
                new_image = req.body.old_image
            }
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                price: req.body.price,
                image: new_image,
                cateid: req.body.cateid,
                qty: req.body.qty,
                cap: req.body.cap,
                des: req.body.des
            }, { new: true });
            await updatedProduct.save();
            // res.status(201).json(savedProduct);
            if (!updatedProduct) {
                res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.redirect('/admin/getproduct')
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            const deletedProduct = await Product.findByIdAndRemove(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            } else {
                res.redirect('/admin/getproduct')
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}