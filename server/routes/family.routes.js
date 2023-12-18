const express = require('express')
const auth = require('../middleware/auth.middleware')
const FamilyController = require('../controllers/family.controller')

const router = express.Router()

router.post('/create', auth, FamilyController.create)
router.get('/', auth, FamilyController.get)
router.get('/members', auth, FamilyController.getMembers)

module.exports = router