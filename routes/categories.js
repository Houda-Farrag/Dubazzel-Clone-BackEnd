const {getAllCategories , getAllProductsOfCategory , postCategory , deleteCategory , updateCategory} = require('../Controllers/categories')
const express = require("express");
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router();

router.get('/' , getAllCategories)
router.get('/:id/products' , getAllProductsOfCategory)
router.post('/' , verifyJWT , postCategory) // admin
router.patch("/:id" , verifyJWT , updateCategory) // admin
router.delete("/:id" , verifyJWT , deleteCategory) //admin

module.exports = router
