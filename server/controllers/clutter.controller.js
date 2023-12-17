const Clutter = require('../models/clutter')
const Vote = require('../models/vote')
const { countVotes } = require('../models/aggregations/vote.aggregations')

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