const express = require('express')
const router = express.Router()
const logoutController = require('../Controllers/logout')

router.get("/", logoutController.handleLogout)
module.exports = router;