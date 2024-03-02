const mongoose = require('mongoose')

const reviewsSchema  = mongoose.Schema({
    userID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    },
    productID:{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "products"
    },
    rating:{
        type : Number,
        minLength:[1,"rating must be at least 1"],
        maxLength:[5,"rating must be less than or equal 5"]
    },
    review:{
        type : String,
        required : [true , 'Review field cannot be empty'],
        minlength: [3, "Review must be at least 3 char"]
    }
},{timestamps:true})

const reviewModel = mongoose.model('ReviewsAndRatings',reviewsSchema)

module.exports = reviewModel