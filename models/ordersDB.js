const mongoose = require('mongoose');

// {"user_id": 2,"product_id":3,"quantity":20,"total_price":200,"status":"Shipped"}
const orderSchema = mongoose.Schema({
    "user_id": {
        type: Number,
        required: true,
    },
    "product_id": [{
        type: Number,
        required: true
    }],
    "quantity": {
        type: Number,
        required: true,
    },

    "total_price": {
        type: Number,
        required: true,

    },
    "status": {
        type: String,
        enum: ["Shipped", "Processing"],
        default: "Processing"
    },

}, { timestamps: true }, { collection: 'orders' });

const OrdersModel = mongoose.model("orders", orderSchema)

module.exports = { OrdersModel }

