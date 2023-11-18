const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Kết nối với model User
        required: true
    },
    status: {
        type: String, // Trạng thái đơn hàng (ví dụ: "đã đặt hàng", "đang giao hàng", "hoàn thành",...)
        required: true
    }
    }, {
    timestamps: true // Tự động tạo thời gian tạo và cập nhật
});

const Order = mongoose.model('Order', orderSchema);

// Export model để sử dụng trong ứng dụng
module.exports = Order;
