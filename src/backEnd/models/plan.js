const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planSchema = new Schema({
    title : { type: String, required: true },
    starts : { type: Number, required: true },
    ends: { type: Number, required: true },
    uid: { type: mongoose.Types.ObjectId, required: false, ref: 'User'}
})

module.exports = mongoose.model('Plan', planSchema);