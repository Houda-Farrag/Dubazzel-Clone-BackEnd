const {getUserProfile , updateProfile , deleteUser , postUser , getAllUsers, 
addProductToFavourite, getUserFavouriteProducts, deleteProductFromFavourite,updateUserProfile} = require('../Controllers/users')
const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')


router.get('/:id', getUserProfile)
router.get('/:id/favourite', getUserFavouriteProducts)
router.get("/" , getAllUsers)
router.patch('/' , verifyJWT ,updateProfile)
router.patch('/:userId/:productId' ,addProductToFavourite)
router.patch('/:userId' ,updateUserProfile)

// router.patch('/:productId' ,verifyJWT,addProductToFavourite)
router.delete('/:id' , verifyJWT ,deleteUser)
router.delete('/:userId/:productId' ,deleteProductFromFavourite)

module.exports = router
