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

const getSubCategory = async(req,res,next)=>{
    const {subCategory} = req.params
    try{
        const subCategorydata = await subCategoriesModel.find({name:subCategory})
        res.status(200).json({subCategoryId: subCategorydata._id})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateSubCategory = async(req,res,next)=>{
    let {id} = req.params
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

const getAllProductOfSubCategory = async(req,res,next)=>{
    let {id} = req.params;
    try{
        const products=  await productModel.find({subCategoryId:id})
        res.status(200).json({subCategoryId:id,"Products Of SubCategory":products})
    }catch(err){
        res.status(401).json({message:err.message});
    }
}

const addSubCategory = async(req,res,next)=>{
    let subCat = req.body
    try{
        const newSubCategory = await subCategoriesModel.create(subCat)
        res.status(200).json({subCategory: newSubCategory})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getAllSubCategories,getSubCategory , updateSubCategory,deleteSubCategory,getAllProductOfSubCategory,addSubCategory}
