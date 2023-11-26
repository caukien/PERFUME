const Cates = require('../models/cateModel');
const Cate = require('../models/cateModel');
const express = require('express');
const router = express.Router();
exports.cateController = {
    //Tao danh muc
    createCate: async(req, res) => {
        try {
            res.render('../views/admin/cate/add')
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postCate: async(req, res) => {
        try {
            console.log(req.body);
            let category = new Cate({
                name: req.body.name
            })
            await category.save();
            // res.status(200).json({ success: true, data})
            res.redirect('/admin/getcate');
        } catch (error) {
            res.status(500).json(error);
        }
        
    },

    //Read
    readCate: async(req, res) => {
        try {
            let perPage = 5;
            let page = req.query.page || 1;
            const count = await Cates.countDocuments({});
            const categorylist = await Cate.find().sort({ createdAt: -1 })
                                                .skip(perPage * page - perPage)
                                                .limit(perPage)
                                                .exec(); 
            // if(!products){
            //     res.status(400).json({message: "Không có sản phẩm" });
            //     return;
            // }
            // res.status(200).json(products);
            res.render("../views/admin/cate/index", {
                data: categorylist,
                current: page, 
                // totalPages,
                pages: Math.ceil(count / perPage),
            });
            // let categorylist = await Cate.find();
            // if(!categorylist) {
            //     res.status(500).json({success: false})
            // }
            // // res.status(200).send(categorylist);
            // res.render('../views/admin/cate/index', {
            //     data: categorylist,
            // })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    readCateid: async(req, res) =>{
        try {
            let categoryid = await Cate.findById(req.params.id);
            if(!categoryid) {
                res.status(500).json({message: 'Không có dang mục sản phẩm này'});
            }
            res.status(200).send(categoryid);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    modifyCate: async(req, res) => {
        try {
            let categoryid = await Cate.findById(req.params.id);
            res.render('../views/admin/cate/edit', { categoryid: categoryid })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //Sua thoong tin
    modiCate: async(req, res)=>{
        try {
            let item = await Cate.findByIdAndUpdate(req.params.id,{
                name: req.body.name
            }, { new: true})
            if(!item) {
                res.status(400).send('Không sửa được!');
            }else{
                res.redirect('/admin/getcate');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteCate: async(req, res) => {
        try {
            let item = await Cate.findByIdAndRemove(req.params.id)
            if(item) {
                res.redirect("/admin/getcate");
                // return res.status(200).json({success: true, message: 'Đã xóa!'})
            }else {
                console.log('Danh mục đã được không xóa thành công.');
                return res.status(500).json({message: 'Không tìm thấy danh mục để xóa.'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}