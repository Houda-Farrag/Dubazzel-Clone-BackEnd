const mongoose = require('mongoose')

const subCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category",
        require: true
    }
}, { timestamps: true })

const subCategoriesModel = mongoose.model("sub-Category", subCategoriesSchema)

<<<<<<< HEAD
module.exports = {subCategoriesModel}
=======
module.exports = { subCategoriesModel }
>>>>>>> 5d59f2a870a595f16929b0e9226722c1af777fef
