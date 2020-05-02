const customerModel = require('../../model/customer');
const error = require('../../helper/error');

exports.getById = async function (query) {
    try {
        const data = await customerModel.findOne(query);
        if (data) {
            return { data, "code": 200 }
        }
        else {
            return {
                "message": "no data found for given id",
                "timestamp": new Date().getTime(),
                "code": 200
            }
        }
    }
    catch (ex) {
        throw ex;
    }
}

exports.getbyMobile = async function (query) {
    try {
        const data = await customerModel.findOne(query);
        if (data) {
            return { data, "code": 200 }
        }
        else {
            return {
                "message": "no data found for given mobile number",
                "timestamp": new Date().getTime(),
                "code": 200
            }
        }
    }
    catch (ex) {
        throw ex;
    }
}


exports.getAll = async function () {
    const data = await customerModel.find();
    return { data, "code": 200 };
}

exports.addCustomer = async function (obj) {
    try {        
        const customerName = obj.firstname + " " + obj.middlename + " " + obj.lastname;
        const _customername = replace(customerName);        
        const isExist = await customerModel.findOne({"mobile" :obj.mobile});
        if (isExist) {
            throw new error.dublicateError('given mobile number (' + obj.mobile  + ') is already exists with customer :-  ' + isExist.customername + " , " + isExist.village  );
        }
        
        obj.customername = _customername;
        obj.address = "village :- " + obj.village + ", tole :- " + obj.tole + ", district :- "  + obj.district;
        return await customerModel.create(obj)
            .then(function (value) {                
                return {
                    message: 'customer added successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.updateCustomer = async function (req) {
    try {
        let data = req.body;
        data["timestamp"] = new Date().getTime();
        return await customerModel.update({ "_id": req.params.id }, { $set: data })
            .then(function (value) {
                return {
                    message: 'customer updated successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

function replace(key) {
    let result = null;
    if(key) result = key.replace(/\s\s+/g, " ").trim().replace(/ /g, "-").trim();

    return result.toUpperCase()
}