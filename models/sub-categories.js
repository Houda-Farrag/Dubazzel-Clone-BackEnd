const mongoose = require('mongoose')

const subCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    }
}, { timestamps: true })

const subCategoriesModel = mongoose.model("sub-categories", subCategoriesSchema)

module.exports = { subCategoriesModel }