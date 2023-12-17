const mongoose = require('mongoose')

exports.countVotes = function (clutterId) {
    return [
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
            '$replaceRoot': {
                'newRoot': {
                    '$arrayToObject': '$votes'
                }
            }
        }
    ]
}