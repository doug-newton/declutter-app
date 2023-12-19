const mongoose = require('mongoose')

exports.countVotes = function (clutterId) {
    return [
        {
            '$match': {
                '_id': new mongoose.Types.ObjectId(clutterId)
            }
        }, {
            '$unwind': {
                'path': '$votes'
            }
        }, {
            '$group': {
                '_id': '$votes.vote',
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$group': {
                '_id': null,
                'voteCounts': {
                    '$push': {
                        'k': '$_id',
                        'v': '$count'
                    }
                }
            }
        }, {
            '$replaceRoot': {
                'newRoot': {
                    '$arrayToObject': '$voteCounts'
                }
            }
        }
    ]
}