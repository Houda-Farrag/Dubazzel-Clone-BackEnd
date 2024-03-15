const { getAllCategories, getAllProductsOfCategory, postCategory, deleteCategory, updateCategory } = require('../Controllers/categories')
const express = require("express");
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router();

<<<<<<< HEAD
router.get('/' , getAllCategories)
router.get('/:id/products' , getAllProductsOfCategory)
router.post('/' , postCategory) 
router.patch("/:id" , verifyJWT , updateCategory) 
router.delete("/:id" , verifyJWT , deleteCategory) 
=======
router.get('/', getAllCategories)

router.get('/:id/products', getAllProductsOfCategory)
router.post('/', verifyJWT, postCategory) // admin
router.patch("/:id", verifyJWT, updateCategory) // admin
router.delete("/:id", verifyJWT, deleteCategory) //admin
>>>>>>> 5d59f2a870a595f16929b0e9226722c1af777fef

module.exports = router
