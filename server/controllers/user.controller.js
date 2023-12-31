const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')

const JWT_SECRET = process.env.JWT_SECRET

exports.signUp = (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, 10).then(hash => {
        const user = new User({
            name: name,
            email: email,
            password: hash
        })

        user.save().then(result => {
            res.status(201).json({
                message: 'signup successful'
            })
        }).catch(error => {
            res.status(500).json({
                message: 'signup failed'
            })
        })

    }).catch(error => {
        res.status(500).json({
            message: 'signup failed'
        })
    })
}

exports.logIn = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email }).then(user => {
        if (user == null) {
            res.status(401).json({
                message: 'login failed'
            })
            return
        }

        bcrypt.compare(password, user.password).then(valid => {
            if (!valid) {
                res.status(401).json({
                    message: 'authentication failed'
                })
                return
            }

            const token = jwt.sign(
                {
                    email: email,
                    userId: user._id,
                    familyId: user.family
                },
                JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            )

            res.status(200).json({
                message: 'login successful',
                token: token,
                userId: user._id,
                familyId: user.family
            })
        })
    }).catch(error => {
        res.status(401).json({
            message: 'authentication failed'
        })
    })
}

exports.refreshToken = (req, res) => {
    User.findOne({
        _id: req.userData.userId
    }).then(user => {
        if (user == null) {
            res.status(500).json({
                message: 'token refresh failed'
            })
            return
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
                familyId: user.family
            },
            JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.status(200).json({
            message: 'token refresh successful',
            token: token,
            userId: user._id,
            familyId: user.family
        })
    }).catch(error => {
        res.status(500).json({
            message: 'token refresh failed'
        })
    })
}

exports.getDetails = (req, res) => {
    const userId = req.params.userId
    const familyId = req.userData.familyId

    User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
        family: new mongoose.Types.ObjectId(familyId)
    }).then(user => {
        if (!user) {
            res.status(404).json({
                message: 'user not found'
            })
            return
        }
        res.status(200).json({
            message: 'user found successfully',
            userId: user._id,
            familyId: user.family,
            name: user.name
        })
    }).catch(error => {
        res.status(500).json({
            message: 'couldn\'t find user'
        })
    })
}