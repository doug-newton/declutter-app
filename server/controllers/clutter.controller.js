const Clutter = require('../models/clutter')
const Aggregations = require('../aggregations/clutter.aggregations')
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
    const familyId = req.userData.familyId
    Clutter.aggregate(Aggregations.findAndPopulateClutterForFamily(familyId)).then(clutter => {
        res.status(200).json({
            message: 'clutter retrieved successfully',
            clutter: clutter
        })
    }).catch(error => {
        res.status(500).json({
            message: 'could not retrieve clutter!'
        })
    })
}

exports.vote = (req, res) => {
    const clutterId = req.params.clutterId
    const vote = req.body.vote
    const userId = req.userData.userId
    const familyId = req.userData.familyId

    Clutter.updateOne(
        { _id: new mongoose.Types.ObjectId(clutterId), familyId: new mongoose.Types.ObjectId(familyId) },
        {
            $push: { votes: {
                userId: new mongoose.Types.ObjectId(userId),
                vote: vote
            }}
        }
    ).then(result => {
        if (result.matchedCount != 1) {
            res.status(401).json({
                message: 'authorisation failed'
            })
            return
        }

        Clutter.aggregate(Aggregations.countVotes(clutterId)).then(voteCounts => {
            voteCounts = voteCounts[0]

            Clutter.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(clutterId), familyId: new mongoose.Types.ObjectId(familyId) },
                {
                    voteCounts: {
                        keep: voteCounts.keep ?? 0,
                        discard: voteCounts.discard ?? 0
                    }
                },
                { new: true }
            ).then(clutter => {
                res.status(201).json({
                    message: 'vote successful',
                    clutter: clutter
                })
            })

        }).catch(error => {
            res.status(500).json({
                message: 'vote aggregation failed'
            })
        })
    }).catch(error => {
        res.status(500).json({
            message: 'voting failed'
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

exports.deleteVote = (req, res) => {
    const userId = req.userData.userId
    const familyId = req.userData.familyId
    const clutterId = req.params.clutterId

    Clutter.updateOne(
        { 
            _id: new mongoose.Types.ObjectId(clutterId),
            familyId: new mongoose.Types.ObjectId(familyId)
        },
        { $pull: { votes: { userId: new mongoose.Types.ObjectId(userId) } } }
    ).then(result => {
        if (result.matchedCount != 1) {
            res.status(401).json({
                message: 'Unauthorised'
            })
            return
        }

        Clutter.aggregate(Aggregations.countVotes(clutterId)).then(voteCounts => {
            voteCounts = voteCounts[0] ?? {}
            Clutter.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(clutterId), familyId: new mongoose.Types.ObjectId(familyId) },
                {
                    voteCounts: {
                        keep: voteCounts.keep ?? 0,
                        discard: voteCounts.discard ?? 0
                    }
                },
                { new: true }
            )
                .populate('addedBy', '_id name email')
                .then(clutter => {
                    res.status(201).json({
                        message: 'vote deleted successfully',
                        clutter: clutter
                    })
                })
        }).catch(error => {
            res.status(500).json({
                message: 'vote aggregation failed'
            })
        })
    }).catch(error => {
        res.status(500).json({
            message: "vote deletion failed"
        })
    })
}
