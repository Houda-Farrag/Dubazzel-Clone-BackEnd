const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: String, required: true },
    images: {
      type: [String],
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price_type: String,
    location: {
      type: String,
      default: "",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sub-categories",
      required: true,
    },
    contact_type: String,
    phoneNumber: String,
    propertyType: String,
    area:Number,
    amenities:[String],
    bedRooms:Number,
    bathRooms:Number
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
