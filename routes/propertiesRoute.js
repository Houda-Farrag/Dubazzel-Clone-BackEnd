const express = require('express')
const propertiesRoute = express.Router()
const { createProperties, getAllProperties, updateProperties, deleteProperties, getPropByID } = require('../Controllers/propertiesController')
const verifyJWT = require('../middleware/verifyJWT')

propertiesRoute.get('/alldata', getAllProperties)  // finish
propertiesRoute.get('/getPropByID/:id', getPropByID)
propertiesRoute.post('/create', verifyJWT ,createProperties)  // finish

propertiesRoute.patch('/update/:id', verifyJWT ,updateProperties)

propertiesRoute.delete('/delete/:id', verifyJWT ,deleteProperties)  //finish

module.exports = { propertiesRoute }