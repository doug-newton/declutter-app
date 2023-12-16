const Clutter = require('../models/clutter')

exports.create = (req, res) => {
    const clutter = new Clutter({
        name: req.body.name,
        description: req.body.description,
        addedBy: req.userData.userId
    })

    clutter.save().then(result => {
        res.status(201).json({
            message: 'clutter created successfully',
            clutterId: clutter._id
        })
    }).catch(error => {
        res.status(500).json({
            message: 'clutter creation failed'
        })
    })
}

exports.getAll = (req, res) => {
    Clutter.find({ addedBy: req.userData.userId }).then(result => {
        res.status(200).json({
            message: 'clutter retrieved successfully',
            clutter: result
        })
    }).catch(error => {
        res.status(500).json({
            message: 'could not retrieve clutter!'
        })
    })
}