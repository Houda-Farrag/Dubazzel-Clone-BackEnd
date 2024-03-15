const express = require('express')
const routerSubCategory = express.Router()
const { getAllSubCategories, updateSubCategory, deleteSubCategory, getAllProductOfSubCategory, addSubCategory, getCategoryByName } = require('../Controllers/sub-categories')
const verifyJWT = require('../middleware/verifyJWT')

<<<<<<< HEAD
routerSubCategory.post('/' ,addSubCategory)
routerSubCategory.get('/',getAllSubCategories)
routerSubCategory.get('/:id',getAllProductOfSubCategory)
routerSubCategory.delete('/:id', verifyJWT ,deleteSubCategory)
routerSubCategory.patch('/:id', verifyJWT ,updateSubCategory)
=======
routerSubCategory.get('/ByName', getCategoryByName)
routerSubCategory.get('/', getAllSubCategories)
// routerSubCategory.post('/', verifyJWT, addSubCategory)
routerSubCategory.post('/',  addSubCategory)

routerSubCategory.get('/:id', getAllProductOfSubCategory)
routerSubCategory.delete('/:id', verifyJWT, deleteSubCategory)
routerSubCategory.patch('/:id', verifyJWT, updateSubCategory)
>>>>>>> 5d59f2a870a595f16929b0e9226722c1af777fef

module.exports = routerSubCategory

