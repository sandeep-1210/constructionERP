const supplierModel = require('../../model/supplier');
const error = require('../../helper/error');

exports.getSupplierById = async function (query) {
    try {
        const data = await supplierModel.findOne(query);
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

exports.getAllSupplier = async function () {
    const data = await supplierModel.find().sort({ "createdDate": -1 });
    return { data, "code": 200 };
}

exports.addSupplier = async function (obj) {
    try {
        const _suppliername = replace(obj.suppliername);
        const isExist = await supplierModel.findOne({ "mobile": obj.mobile });
        let isExistEmail;
        if (obj.emailid) {
            isExistEmail = await supplierModel.findOne({ "emailid": obj.emailid });
        }

        if (isExist) {
            throw new error.dublicateError('mobile number already exists with supplier ' + isExist.suppliername + " from " + isExist.address)
        }

        if (isExistEmail) {
            throw new error.dublicateError('email id already exists with supplier ' + isExistEmail.suppliername + " from " + isExistEmail.address)
        }

        obj.suppliername = _suppliername;
        return await supplierModel.create(obj)
            .then(function (value) {
                return {
                    message: 'supplier added successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.updateSupplier = async function (req) {
    try {
        let data = req.body;
        data["timestamp"] = new Date().getTime();
       
        const isExist = await supplierModel.findOne({ "mobile": data.mobile, "suppliername": { $ne :data.suppliername }});
        let isExistEmail;
        if (data.emailid) {
            isExistEmail = await supplierModel.findOne({ "emailid": data.emailid, "suppliername": { $ne :data.suppliername }});
        }
        if (isExist) {
            throw new error.dublicateError('mobile number already exists with supplier ' + isExist.suppliername + " from " + isExist.address)
        }

        if (isExistEmail) {
            throw new error.dublicateError('email id already exists with supplier ' + isExistEmail.suppliername + " from " + isExistEmail.address)
        }


        return await supplierModel.update({ "_id": req.params.id }, { $set: data },{ runValidators: true })
            .then(function (value) {
                return {
                    message: 'supplier updated successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.deleteSupplier = async function (query) {
    try {
        const data = await supplierModel.deleteOne(query);
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

function replace(key) {
    let result = null;
    if(key) result = key.replace(/\s\s+/g, " ").trim().replace(/ /g, "-").trim();

    return result.toUpperCase()
}