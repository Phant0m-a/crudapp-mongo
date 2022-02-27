const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const schema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    paymentMethod: {
        type: String,
        default: 'COS'
        // required: true
    },
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        price: {
            type: Number,
            default: 0,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cat",
            required: true
        },
        status: {
            type: String,
            required: true
            //cancle/pending
        }
    }],

});

const OrderModel = mongoose.model("Order", schema);
module.exports = OrderModel;


