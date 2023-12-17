const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    clutterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Clutter' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    vote: { type: String, required: true }
})

module.exports = mongoose.model('Vote', voteSchema)