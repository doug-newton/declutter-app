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
        owner: req.userData.userId
    })

    family.save().then(result => {
        User.updateOne( { _id: req.userData.userId }, { family: family._id }).then(result => {
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
    Family.findOne({ _id: new mongoose.Types.ObjectId(req.userData.familyId) }).then(family => {
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
    })
}

exports.getMembers = (req, res) => {
    if (req.userData.familyId == null) {
        res.status(500).json({
            message: 'no family'
        })
        return
    }

    User.aggregate([
        {
            '$match': {
                family: new mongoose.Types.ObjectId(req.userData.familyId)
            }
        }, {
            '$project': {
                password: 0
            }
        }
    ]).then(members => {
        res.status(200).json({
            message: 'family members found successfully',
            familyMembers: members
        })
    }).catch(error => {
        res.status(500).json({
            message: 'couldn\'t find family members'
        })
    })
}