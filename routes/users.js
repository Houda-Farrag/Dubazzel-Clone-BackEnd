const {getUserProfile , updateProfile , deleteUser , postUser , 
    getAllUsers, addProductToFavourite , getMyProfile , getUserFavouriteProducts} = require('../Controllers/users')
const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')


router.get('/getUser/:id', getUserProfile)
router.get('/:id/favourite', getUserFavouriteProducts)
router.get("/" , getAllUsers)
router.get("/getMyProfile" , verifyJWT , getMyProfile)
router.patch('/' , verifyJWT ,updateProfile)
router.patch('/:userId/:productId' ,addProductToFavourite)
// router.patch('/:productId' ,verifyJWT,addProductToFavourite)
router.delete('/:id' , verifyJWT ,deleteUser)

module.exports = router
