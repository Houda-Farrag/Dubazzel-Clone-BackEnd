const mongoose = require('mongoose')

const chatSchema  = mongoose.Schema({
    sellerID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
        required:true
    },
    buyerID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
        required:true
    },
    productID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "products",
        required:true
    },
    chat:[
            {
                message:{
                    type: String,
                    required:true
                },
                sender:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref: "users"
                },
                receiver:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref: "users"
                },
                date:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
},{timestamps:true})

const chatsModel = mongoose.model('chats',chatSchema)

module.exports = {chatsModel}