const express = require('express')
const router = express.Router()

router.get('/single', require('../controllers/readDocController'))
router.get('/completion',require('../controllers/getDocResponse'))

module.exports = router