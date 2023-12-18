const Clutter = require('../models/clutter')
const Vote = require('../models/vote')
const { countVotes } = require('../models/aggregations/vote.aggregations')
const mongoose = require('mongoose')

exports.create = (req, res) => {
    const clutter = new Clutter({
        name: req.body.name,
        description: req.body.description,
        addedBy: req.userData.userId,
        familyId: req.userData.familyId
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
    Clutter.find({ familyId: req.userData.familyId }).then(result => {
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
        Vote.aggregate(countVotes(clutterId)).then(voteCounts => {
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

exports.getVotes = (req, res) => {
    const clutterId = req.params.clutterId

    Vote.aggregate(countVotes(clutterId)).then(voteCounts => {
        const voteCount = voteCounts[0] ?? {
            keep: 0,
            discard: 0
        }
        res.status(201).json({
            message: 'votes retrieved successfully',
            votes: voteCount
        })
    }).catch(error => {
        res.status(500).json({
            message: 'coudn\'t retrieve votes',
            error: error
        })
    })
}

exports.update = (req, res) => {
    const userId = req.userData.userId
    const clutterId = req.params.clutterId
    const name = req.body.name
    const description = req.body.description

    Clutter.updateOne({
        _id: new mongoose.Types.ObjectId(clutterId),
        addedBy: new mongoose.Types.ObjectId(userId)
    },
        { name: name, description: description }
    ).then(result => {
        if (result.matchedCount != 1) {
            res.status(401).json({
                message: 'Unauthorised'
            })
            return
        }
        res.status(201).json({
            message: 'clutter updated successfully'
        })
    }).catch(error => {
        res.status(500).json({
            message: 'clutter updated failed'
        })
    })
}

exports.delete = (req, res) => {
    const userId = req.userData.userId
    const clutterId = req.params.clutterId

    Clutter.deleteOne({
        _id: new mongoose.Types.ObjectId(clutterId),
        addedBy: new mongoose.Types.ObjectId(userId)
    }).then(result => {
        if (result.deletedCount != 1) {
            res.status(401).json({
                message: 'Unauthorised'
            })
            return
        }
        res.status(201).json({
            message: 'clutter deleted successfully',
            result: result
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'clutter deletion failed'
        })
    })
}