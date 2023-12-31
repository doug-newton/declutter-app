const express = require('express')
const UserController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/signup', UserController.signUp)
router.post('/login', UserController.logIn)
router.get('/refresh', auth, UserController.refreshToken)
router.get('/:userId/details', auth, UserController.getDetails)

module.exports = router