const express = require('express')
const ClutterController = require('../controllers/clutter.controller')
const auth = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/', auth, ClutterController.create)
router.get('/', auth, ClutterController.getAll)
router.put('/:clutterId', auth, ClutterController.update)
router.delete('/:clutterId', auth, ClutterController.delete)
router.post('/:clutterId/vote', auth, ClutterController.vote)

module.exports = router