const express = require('express')
const router = express.Router()
const speech2text = require('../controllers/speechtotextController')
const textcompletion = require('../controllers/chatcompletionController')
const text2speech =require('../controllers/texttospeechController')


router.get('/voicespeech',speech2text)
router.get('/completetext',textcompletion)
router.get('/talk',text2speech)

module.exports = router