const express = require('express')
const ordersRoute = express.Router()
const { createOrder, getAllOrders, updateOrders, deleteOrders, getOrderByID } = require('../Controllers/ordersController')
const verifyJWT = require('../middleware/verifyJWT')

ordersRoute.get('/alldata', getAllOrders)

ordersRoute.get('/orderById/:id', getOrderByID)

ordersRoute.post('/create', verifyJWT ,createOrder)

ordersRoute.patch('/update/:id', verifyJWT ,updateOrders)

ordersRoute.delete('/delete/:id', verifyJWT ,deleteOrders)

module.exports = { ordersRoute }


