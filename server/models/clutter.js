const mongoose = require('mongoose')

const clutterSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
})

module.exports = mongoose.model('Clutter', clutterSchema)