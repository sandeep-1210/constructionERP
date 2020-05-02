const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../../config')

const ProductModel = new Schema({
    productname: { type: String, required: true },
    categoryname: { type: String, required: true },
    brandName: { type: String, required: true },
    productsize: String,
    producttype: String,
    price1: { type: String, required: true },
    price2: { type: String },
    price3: { type: String },
    purchaseprice: { type: String, required: true },
    suppliername: { type: String, required: true },
    unitofmeasure: { type: String, required: true },    
    quantity: { type: Number },
    totalweightinkg: { type: Number },
    storename: { type: String },
    availability: { type: Boolean },
    createdDate: { type: Date, default: Date.now },
    timestamp: { type: String, default: new Date().getTime() }
})

module.exports = mongoose.model('Product', ProductModel)