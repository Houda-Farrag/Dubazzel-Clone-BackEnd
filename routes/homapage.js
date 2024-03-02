const express = require('express')
const {getAllProducts} = require('../Controllers/homepage')


const router = express.Router()
router.get('/products', getAllProducts);
module.exports = router