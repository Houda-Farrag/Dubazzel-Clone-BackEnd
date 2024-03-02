const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id:{
        type:Number,
        required:true
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: String, required: true },
    images: {
      type: [String],
      required: true,
    },
    sellerData: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      userName: {
        type: String,
        required: true,
      },
      phoneNumber: { type: String, required: true },
    },
    price_type: String,
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    //   required: true,
    },
    subCategory: String,
    contact_type: String,
    // ratingsId:{
    //     type:[Number],
    //     default:[]
    // },
    // subCategoryId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "sub-categories",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
