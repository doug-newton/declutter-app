const express = require('express')
const ClutterController = require('../controllers/clutter.controller')
const auth = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/create', auth, ClutterController.create)
router.get('/', auth, ClutterController.getAll)
router.post('/vote', auth, ClutterController.vote)
router.get('/:clutterId/votes', auth, ClutterController.getVotes)

module.exports = router