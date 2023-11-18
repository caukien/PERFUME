const Order = require('../models/orderModel.js');


exports.orderController = {
    // Phương thức: Tạo một đơn hàng mới
    createOrder: async(req, res) =>{
        try {
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Lấy tất cả các đơn hàng
    getallOrder: async(req, res) =>{
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Lấy một đơn hàng bằng ID,
    getbyidorder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
            res.status(404).json({ message: 'Đơn hàng không tồn tại' });
            } else {
            res.status(200).json(order);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Phương thức: Cập nhật một đơn hàng bằng ID
    updateOrder: async(req, res) =>{
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedOrder) {
            res.status(404).json({ message: 'Đơn hàng không tồn tại' });
            } else {
            res.status(200).json(updatedOrder);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}