const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandsModel = new Schema({
    brandname: { type: String, unique: true, required: true },    
    branddescription: { type: String },
    active: { type: Boolean },    
    createdDate: { type: Date, default: Date.now },
    timestamp: { type: String, default: new Date().getTime() }
})

module.exports = mongoose.model('brands', brandsModel)