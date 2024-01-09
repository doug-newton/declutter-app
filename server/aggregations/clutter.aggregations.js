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

exports.findAndPopulateClutterForFamily = function (familyId) {
    return [
        {
            '$match': {
                'familyId': new mongoose.Types.ObjectId(familyId)
            }
        }, {
            '$lookup': {
                'from': 'users',
                'as': 'addedBy',
                'localField': 'addedBy',
                'foreignField': '_id',
                'pipeline': [
                    {
                        '$project': {
                            '_id': 1,
                            'name': 1,
                            'email': 1
                        }
                    }
                ]
            }
        }, {
            '$set': {
                'addedBy': {
                    '$first': '$addedBy'
                }
            }
        }, {
            '$unwind': {
                'path': '$votes'
            }
        }, {
            '$group': {
                '_id': '$_id',
                'membersVoted': {
                    '$push': '$votes.userId'
                },
                'votes': {
                    '$push': '$votes'
                },
                'root': {
                    '$first': '$$ROOT'
                }
            }
        }, {
            '$replaceRoot': {
                'newRoot': {
                    '$mergeObjects': [
                        '$root', '$$ROOT'
                    ]
                }
            }
        }, {
            '$unset': 'root'
        }, {
            '$lookup': {
                'from': 'families',
                'as': 'family',
                'localField': 'familyId',
                'foreignField': '_id'
            }
        }, {
            '$set': {
                'family': {
                    '$first': '$family'
                }
            }
        }, {
            '$set': {
                'membersToVote': {
                    '$setDifference': [
                        '$family.members', '$membersVoted'
                    ]
                }
            }
        }, {
            '$unset': 'family'
        }, {
            '$lookup': {
                'from': 'users',
                'as': 'membersVoted',
                'localField': 'membersVoted',
                'foreignField': '_id',
                'pipeline': [
                    {
                        '$project': {
                            '_id': 1,
                            'name': 1,
                            'email': 1
                        }
                    }
                ]
            }
        }, {
            '$lookup': {
                'from': 'users',
                'as': 'membersToVote',
                'localField': 'membersToVote',
                'foreignField': '_id',
                'pipeline': [
                    {
                        '$project': {
                            '_id': 1,
                            'name': 1,
                            'email': 1
                        }
                    }
                ]
            }
        }
    ]
}