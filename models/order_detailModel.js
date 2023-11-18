const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    orderid: {
        type: mongoose.Types.ObjectId,
        ref: 'Order', // Kết nối với model Order
        required: true
    },
    prodid: {
        type: mongoose.Types.ObjectId,
        ref: 'Product', // Kết nối với model Product
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    prodprice: {
        type: Number,
        required: true
    },
    prodname: {
        type: String,
        required: true
    },
    prodimage: {
        type: String,
        default: ""
    }
    }, {
    timestamps: true // Tự động tạo thời gian tạo và cập nhật
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

// Export model để sử dụng trong ứng dụng
module.exports = OrderDetail;
