const brandModel = require('../../model/brands');
const error = require('../../helper/error');

exports.get = async function (query) {
    try {
        const data = await brandModel.findOne(query);
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

exports.getAll = async function () {
    const data = await brandModel.find().sort({"createdDate":-1});
    return { data, "code": 200 };
}

exports.addBrand = async function (obj) {
    try {
        const _brandName = replace(obj.brandname);
        let isExist = {};        
            isExist = await brandModel.findOne({ "brandname": _brandName });

        if (isExist) {
            throw new error.dublicateError('brand already exists')
        }
       

        obj.brandname = _brandName;
        return await brandModel.create(obj)
            .then(function (value) {
                return {
                    message: 'brand added successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.updateBrand = async function (req) {
    try {
        let data = req.body;
        data["timestamp"] = new Date().getTime();
        data.brandname = replace(data.brandname);
        return await brandModel.update({ "_id": req.params.id }, { $set: data })
            .then(function (value) {
                return {
                    message: 'brand update successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.deleteBrand = async function (query) {
    try {
        const data = await brandModel.deleteOne(query);
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