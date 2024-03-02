const {getUserProfile , updateProfile , deleteUser , postUser , getAllUsers} = require('../Controllers/users')
const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')


router.get('/:id', getUserProfile)
router.get("/" , getAllUsers)
router.patch('/:id' , verifyJWT ,updateProfile)
router.delete('/:id' , verifyJWT ,deleteUser)

module.exports = router
