const Family = require('../models/family')
const User = require('../models/user')
const mongoose = require('mongoose')

exports.create = (req, res) => {
    const name = req.body.name

    if (req.userData.familyId) {
        res.status(500).json({
            message: 'can\'t create family - you already have one!'
        })
        return
    }

    const family = new Family({
        name: name,
        owner: req.userData.userId,
        members: [
            new mongoose.Types.ObjectId(req.userData.userId)
        ]
    })

    family.save().then(result => {
        User.updateOne({ _id: req.userData.userId }, { family: family._id }).then(result => {
            res.status(201).json({
                message: 'family created successfully',
                familyId: family._id
            })
        }).catch(error => { throw error })
    }).catch(error => {
        res.status(500).json({
            message: 'family creation failed',
            error: error
        })
    })
}

exports.get = (req, res) => {
    const familyId = req.params.familyId
    const userId = req.userData.userId

    Family.findOne({
        _id: new mongoose.Types.ObjectId(familyId),
        members: new mongoose.Types.ObjectId(userId)
    })
        .populate('owner', '_id name email')
        .populate('members', '_id name email')
        .then(family => {
            if (!family) {
                res.status(404).json({
                    message: 'family not found'
                })
                return
            }
            res.status(200).json({
                message: 'family retrieved successfully',
                family: family
            })
        }).catch(error => {
            res.status(404).json({
                message: 'family not found'
            })
            return
        })
}

exports.update = (req, res) => {
    const userId = req.userData.userId
    const familyId = req.params.familyId
    const newName = req.body.name

    Family.updateOne(
        { _id: new mongoose.Types.ObjectId(familyId), owner: new mongoose.Types.ObjectId(userId) },
        { name: newName }
    ).then(result => {
        if (result.matchedCount != 1) {
            res.status(401).json({
                message: 'Unauthorised'
            })
            return
        }
        res.status(201).json({
            message: 'family updated successfully'
        })
    }).catch(error => {
        res.status(500).json({
            message: 'failed to update family'
        })
    })
}

exports.removeMember = (req, res) => {
    const userId = req.userData.userId
    const familyId = req.params.familyId
    const memberId = req.params.memberId

    Family.findOne({
        _id: new mongoose.Types.ObjectId(familyId),
        owner: new mongoose.Types.ObjectId(userId),
    }).then(family => {
        if (family == null) {
            res.status(404).json({
                message: 'family not found',
            })
            return
        }
        family.members.pull({ _id: new mongoose.Types.ObjectId(memberId) })
        family.save()

        User.updateOne({
            _id: new mongoose.Types.ObjectId(memberId)
        }, {
            $unset: {
                family: 1
            }
        }).then(result => {

            Family.findOne({
                _id: new mongoose.Types.ObjectId(familyId),
                owner: new mongoose.Types.ObjectId(userId),
            })
                .populate('owner', '_id name email')
                .populate('members', '_id name email')
                .then(family => {
                    res.status(200).json({
                        message: 'member removed successfully',
                        family: family
                    })
                })

        }).catch(error => {
            res.status(500).json({
                message: 'failed to unset member\'s family'
            })
        })
    }).catch(error => {
        res.status(500).json({
            message: 'failed to remove family member'
        })
    })
}

exports.addMember = (req, res) => {
    const userId = req.userData.userId
    const familyId = req.params.familyId
    const memberEmail = req.body.email

    console.log(memberEmail)

    User.findOne({
        email: memberEmail
    }).then(member => {
        if (member == null) {
            res.status(404).json({
                message: 'member email not found'
            })
            return
        }

        Family.findOne({
            _id: new mongoose.Types.ObjectId(familyId),
            owner: new mongoose.Types.ObjectId(userId)
        }).then(family => {
            if (family == null) {
                res.status(404).json({
                    message: 'family not found'
                })
                return
            }

            family.members.push(new mongoose.Types.ObjectId(member._id))
            family.save().then(saveFamilyResult => {
                member.family = new mongoose.Types.ObjectId(family._id)
                member.save().then(saveMemberResult => {
                    Family.findOne({
                        _id: new mongoose.Types.ObjectId(familyId),
                        owner: new mongoose.Types.ObjectId(userId),
                    })
                        .populate('owner', '_id name email')
                        .populate('members', '_id name email')
                        .then(family => {
                            res.status(200).json({
                                message: 'member added successfully',
                                family: family
                            })
                        })
                })
            })

        }).catch(error => {
            console.log(error)
            res.status(404).json({
                message: 'family not found'
            })
        })
    }).catch(error => {
        res.status(404).json({
            message: 'member email not found'
        })
    })
}
