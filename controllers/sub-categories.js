const { subCategoriesModel } = require("../Models/sub-categories")
const { productModel } = require("../Models/products")


const getAllSubCategories = async (req, res, next) => {
    try {
        const AllSubCategories = await subCategoriesModel.find().populate("categoryId")
        res.status(200).json(AllSubCategories)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateSubCategory = async (req, res, next) => {
    let { id } = req.params
    let updates = req.body
    try {
        const updatedSubCategory = await subCategoriesModel.findByIdAndUpdate(id, updates, { new: true, runValidator: true })
        res.status(200).json({ message: "Updated SubCategory successfully", Updated_SubCategory: updatedSubCategory })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteSubCategory = async (req, res, next) => {
    let { id } = req.params
    try {
        const deletedSubCategory = await subCategoriesModel.findByIdAndDelete(id)
        res.status(200).json({ message: "deleted Successfully", Deleted_SubCategory: deletedSubCategory })
    } catch (err) {
        res.statu(401).json({ message: err.message })
    }
}


const getAllProductOfSubCategory = async (req, res, next) => {
    let { id } = req.params;
    try {
        const products = await productModel.find({ subCategoryId: id })
        res.status(200).json({ subCategoryId: id, "Products Of SubCategory": products })
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

const addSubCategory = async (req, res, next) => {
    let subCategory = req.body
    try {
        const newSubCategory = await subCategoriesModel.create(subCategory)
        res.status(201).json({ message: "sub Category added", "sub category": newSubCategory })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// ++++++++++ get sub-category by name
const getCategoryByName = async (req, res, next) => {
    const { name } = req.body
    if (!name) res.status(401).json({ MSG: "write name of category" })
    try {
        const categoryData = await subCategoriesModel.find({ name: name })
        res.status(200).json(categoryData)
    } catch (error) {
    }
}


module.exports = { getAllSubCategories, updateSubCategory, deleteSubCategory, getAllProductOfSubCategory, addSubCategory, getCategoryByName }