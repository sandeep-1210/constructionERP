const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerModel = new Schema({
    customername: { type: String },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String },
    mobile: { type: Number, unique: true, required: true },
    emailid: { type: String},
    village: { type: String},
    tole: { type: String},
    block: { type: String},
    district: { type: String},
    address: { type: String },
    transactionid: { type: String },
    active: { type: Boolean },     
    createdDate: { type: Date, default: Date.now },
    timestamp: { type: String, default: new Date().getTime() }
})


module.exports = mongoose.model('Customer', customerModel)