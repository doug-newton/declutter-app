const mongoose = require('mongoose')

const vote = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vote: { type: String, required: true },
    _id: false
})

const voteCount = mongoose.Schema({
    keep: { type: Number, required: true, default: 0 },
    discard: { type: Number, required: true, default: 0 },
    _id: false
})

const clutterSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
    votes: {
        type: [vote], required: false, default: []
    },
    voteCounts: { type: voteCount, required: true, default: { keep: 0, discard: 0 } }
})

module.exports = mongoose.model('Clutter', clutterSchema)