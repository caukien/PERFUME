const OrderDetail = require('../models/order_detailModel.js');
const express = require('express');

exports.orderDetailController = {
    // Phương thức: Tạo một chi tiết đơn hàng mới
    createOrderDetail: async(req, res) =>{
        try {
            const newOrderDetail = new OrderDetail(req.body);
            const savedOrderDetail = await newOrderDetail.save();
            res.status(201).json(savedOrderDetail);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Lấy tất cả chi tiết đơn hàng
    getAllOrderDetails: async(req, res) =>{
        try {
            const orderDetails = await OrderDetail.find();
            res.status(200).json(orderDetails);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Lấy chi tiết đơn hàng bằng ID
    getByIdOrderDetail: async(req, res) =>{
        try {
            const orderDetail = await OrderDetail.findById(req.params.id);
            if (!orderDetail) {
            res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại' });
            } else {
            res.status(200).json(orderDetail);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Xóa chi tiết đơn hàng bằng ID
    deleteOrderDetail: async(req, res) => {
        try {
            const deletedOrderDetail = await OrderDetail.findByIdAndRemove(req.params.id);
            if (!deletedOrderDetail) {
            res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại' });
            } else {
            res.status(200).json({ message: 'Chi tiết đơn hàng đã bị xóa' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}