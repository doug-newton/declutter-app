const express = require('express')
const auth = require('../middleware/auth.middleware')
const FamilyController = require('../controllers/family.controller')

const router = express.Router()

router.post('/create', auth, FamilyController.create)
router.get('/:familyId', auth, FamilyController.get)

module.exports = router