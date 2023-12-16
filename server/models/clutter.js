const mongoose = require('mongoose')

const clutterSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Clutter', clutterSchema)