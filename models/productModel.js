const mongoose = require('mongoose');
// const {Cates} = require("./cateModel")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // Tên sản phẩm bắt buộc phải được cung cấp
    },
    price: {
        type: Number,
        required: true  // Giá sản phẩm bắt buộc phải được cung cấp
    },
    image: {
        type: String,
        required: true
    },
    cateid: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,  // ID danh mục bắt buộc phải được cung cấp
        ref: 'Cate'
    },
    qty: {
        type: Number,
        required: true  // Số lượng sản phẩm bắt buộc phải được cung cấp
    },
    cap:{
        type: Number,
        require: true
    },
    des: {
        type: String,
        required: false  // Mô tả sản phẩm bắt buộc phải được cung cấp
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

// Export model để sử dụng trong ứng dụng

module.exports = {Product};