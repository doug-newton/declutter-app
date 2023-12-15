const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.signUp = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, 10).then(hash => {
        const user = new User({
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