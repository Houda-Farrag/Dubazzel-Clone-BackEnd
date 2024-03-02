const express = require('express')
const shoppingRoute = express.Router()
const { createShopping, getAllShopping, updateShopping, deleteShopping,getShopByID } = require('../Controllers/shoppingController')
const verifyJWT = require('../middleware/verifyJWT')


// create
shoppingRoute.post('/create', verifyJWT ,createShopping)

// read
shoppingRoute.get('/alldata', verifyJWT ,getAllShopping)

shoppingRoute.get('/getShoppingByID/:id', verifyJWT ,getShopByID)

// update
shoppingRoute.patch('/update/:id', verifyJWT ,updateShopping)

// delete
shoppingRoute.delete('/delete/:id', verifyJWT ,deleteShopping)

module.exports = { shoppingRoute }