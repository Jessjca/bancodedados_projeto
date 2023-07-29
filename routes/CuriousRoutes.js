const express = require('express')
const router = express.Router()
const CuriousController = require('../controllers/CuriousController')
//controller

router.get('/', CuriousController.showCurious)

module.exports = router