const mongoose = require('mongoose')
const shortid = require('shortid')

const urlSchema = new mongoose.Schema({
    originalUrl: {type: String, required: true},
    shortUrl: {type: String, required: true, default: shortid.generate},
    clicks:{ type: Number, required: true, default: 0}
})

const URLModel = mongoose.model('urls', urlSchema)

module.exports = URLModel