const {getUserProfile , updateProfile , deleteUser , postUser , 
    getAllUsers, addProductToFavourite, getUserFavouriteProducts} = require('../Controllers/users')
const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')


router.get('/:id', getUserProfile)
router.get('/:id/favourite', getUserFavouriteProducts)
router.get("/" , getAllUsers)
router.patch('/' , verifyJWT ,updateProfile)
router.patch('/:userId/:productId' ,addProductToFavourite)
// router.patch('/:productId' ,verifyJWT,addProductToFavourite)
router.delete('/:id' , verifyJWT ,deleteUser)

module.exports = router
