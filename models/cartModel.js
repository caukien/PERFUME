const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Kết nối với model User
        required: true
    },
    prodid: {
        type: mongoose.Types.ObjectId,
        ref: 'Product', // Kết nối với model Product
        required: true
    },
    prodname: {
        type: String,
        required: true
    },
    prodprice: {
        type: Number,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // }
});

const Cart = mongoose.model('Cart', cartSchema);

// Export model để sử dụng trong ứng dụng
module.exports = Cart;
