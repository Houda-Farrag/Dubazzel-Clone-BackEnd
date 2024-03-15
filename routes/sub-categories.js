const express = require('express')
const routerSubCategory = express.Router()
const { getAllSubCategories, updateSubCategory, deleteSubCategory, getAllProductOfSubCategory, addSubCategory, getCategoryByName } = require('../Controllers/sub-categories')
const verifyJWT = require('../middleware/verifyJWT')

routerSubCategory.post('/' ,addSubCategory)
routerSubCategory.get('/',getAllSubCategories)
routerSubCategory.get('/:id',getAllProductOfSubCategory)
routerSubCategory.delete('/:id', verifyJWT ,deleteSubCategory)
routerSubCategory.patch('/:id', verifyJWT ,updateSubCategory)

module.exports = routerSubCategory

