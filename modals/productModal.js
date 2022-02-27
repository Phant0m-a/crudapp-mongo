const mongoose = require('mongoose');
const schema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCat",
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    },
    enable: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const productModal = mongoose.model("Product", schema);
module.exports = productModal;