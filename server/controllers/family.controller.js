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

    Family.findOne(
        {
            _id: new mongoose.Types.ObjectId(familyId),
            members: new mongoose.Types.ObjectId(userId)
        }).then(family => {
            if (!family) {
                res.status(404).json({
                    message: 'family not found'
                })
                return
            }
            family.populate('members', '_id name email').then(populatedFamily => {
                res.status(200).json({
                    message: 'family retrieved successfully',
                    family: populatedFamily
                })
            }).catch(error => {
                res.status(500).json({
                    message: 'could\'nt populate family'
                })
                return
            })
        }).catch(error => {
            res.status(404).json({
                message: 'family not found'
            })
        })
}