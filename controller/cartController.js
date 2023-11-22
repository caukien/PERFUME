const Cart = require('../models/cartModel.js');
const express = require('express');


exports.cartController = {
    // Phương thức: Tạo một mục giỏ hàng mới
    createCart: async(req, res) =>{
        try {
            const newCartItem = new Cart({
                userid: req.body.userid,
                prodid: req.body.prodid,
                prodname: req.body.prodname,
                prodprice: req.body.prodprice,
            });
            const savedCartItem = await newCartItem.save();
            res.status(201).json(savedCartItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Lấy tất cả các mục giỏ hàng
    getCart: async(req, res) =>{
        try {
            // const cartItems = await Cart.find();
            res.render("../views/client/cart");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Lấy một mục giỏ hàng bằng ID
    getCartbyId: async(req, res) =>{
        try {
            const cartItem = await Cart.findById(req.params.id);
            if (!cartItem) {
            res.status(404).json({ message: 'Mục giỏ hàng không tồn tại' });
            } else {
            res.status(200).json(cartItem);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Cập nhật một mục giỏ hàng bằng ID
    updateCart: async(req, res) => {
        try {
            const updatedCartItem = await Cart.findByIdAndUpdate(req.params.id,
                {
                userid: req.body.userid,
                prodid: req.body.prodid,
                prodname: req.body.prodname,
                prodprice: req.body.prodprice,
            }, { new: true });
            if (!updatedCartItem) {
            res.status(404).json({ message: 'Mục giỏ hàng không tồn tại' });
            } else {
            res.status(200).json(updatedCartItem);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Xóa một mục giỏ hàng bằng ID
    deleteCart: async(req, res) =>{
        try {
            const deletedCartItem = await Cart.findByIdAndRemove(req.params.id);
            if (!deletedCartItem) {
            res.status(404).json({ message: 'Mục giỏ hàng không tồn tại' });
            } else {
            res.status(200).json({ message: 'Mục giỏ hàng đã bị xóa' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
