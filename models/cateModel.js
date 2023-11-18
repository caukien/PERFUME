const mongoose = require('mongoose');
 
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Cates = mongoose.model('Cate', categorySchema);

module.exports = Cates;