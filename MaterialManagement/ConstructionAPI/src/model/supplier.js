const mongoose = require('mongoose')
const Schema = mongoose.Schema

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const supplierModel = new Schema({
    suppliername: { type: String, required: true },      
    mobile: {
        type: String, 
        required: 'Mobile number is required',        
        match: [/^(\+\d{2}[- ]?)?\d{10}$/, 'Please fill a valid mobile number']
    },
    emailid: {
        type: String,
        trim: true,
        lowercase: true,       
        required: false,        
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: { type: String, required: true },
    fulladdresss: { type: String, required: true },
    companyname: { type: String ,required: true },
    active: { type: Boolean },
    createdDate: { type: Date, default: Date.now },
    timestamp: { type: String, default: new Date().getTime() }
})

module.exports = mongoose.model('Supplier', supplierModel)