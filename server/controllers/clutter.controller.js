const mongoose = require('mongoose')
const Clutter = require('../models/clutter')
const Vote = require('../models/vote')

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

exports.vote = (req, res) => {
    const clutterId = req.body.clutterId
    const vote = req.body.vote
    const userId = req.userData.userId

    const voteEntry = new Vote({
        clutterId: clutterId,
        userId: userId,
        vote: vote
    })

    voteEntry.save().then(result => {
        Vote.aggregate([
            {
                '$match': {
                    'clutterId': new mongoose.Types.ObjectId(clutterId)
                }
            }, {
                '$group': {
                    '_id': {
                        'clutterId': '$clutterId',
                        'vote': '$vote'
                    },
                    'total': {
                        '$sum': 1
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id.clutterId',
                    'votes': {
                        '$push': {
                            'k': '$_id.vote',
                            'v': '$total'
                        }
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'votes': {
                        '$arrayToObject': '$votes'
                    }
                }
            }
        ]).then(voteCounts => {
            console.log(voteCounts)
            const voteCount = voteCounts[0]
            res.status(201).json({
                message: 'vote created successfully',
                votes: voteCount
            })
        }).catch(error => {
            res.status(500).json({
                message: 'vote aggregation failed',
                error: error
            })
        })
    }).catch(error => {
        res.status(500).json({
            message: 'voting failed',
            error: error
        })
    })
}