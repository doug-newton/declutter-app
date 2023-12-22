const express = require('express')
const auth = require('../middleware/auth.middleware')
const FamilyController = require('../controllers/family.controller')

const router = express.Router()

router.post('/', auth, FamilyController.create)
router.get('/:familyId', auth, FamilyController.get)
router.put('/:familyId', auth, FamilyController.update)
router.post('/:familyId/members', auth, FamilyController.addMember)
router.delete('/:familyId/members/:memberId', auth, FamilyController.removeMember)

module.exports = router