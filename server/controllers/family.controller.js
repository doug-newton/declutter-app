const Family = require('../models/family')
const User = require('../models/user')

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