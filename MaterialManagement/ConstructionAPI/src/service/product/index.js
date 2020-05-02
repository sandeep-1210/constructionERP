const productModel = require('../../model/product');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('../../../config')
const error = require('../../helper/error');

exports.get = async function (query) {
    try {
        const data = await productModel.findOne(query);
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
    const data = await productModel.find();
    return { data, "code": 200 };
}

exports.getAllWithCount = async function () {
    const data = await productModel.find();
    return {
        "count": data.length,
        data,
        "code": 200
    };
}

exports.addProduct = async function (obj) {
    try {
        const _productName = replace(obj.productname);
        let isExist = {};
        if (obj.categoryname.toLowerCase().includes("iron-road")) {
            isExist = await productModel.findOne({
                "productname": _productName, "productsize": obj.productsize,
                "purchaseprice": obj.purchaseprice, "suppliername": obj.suppliername
            });
        }
        else {
            isExist = await productModel.findOne({ "productname": _productName });
        }
        if (isExist) {
             throw new error.dublicateError( "Product " + _productName + ' already exists in record please update required details from Product List page ')
            // obj._id = isExist.id
            // obj.quantity = Number(obj.quantity) + Number(isExist.quantity);
            // return await this.updateProduct(obj);            
        }

        obj.productname = _productName;
        return await productModel.create(obj)
            .then(function (value) {
                return {
                    message: 'product added successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.updateProduct = async function (req) {
    try {
        let data = req.body ? req.body : req;
        let paramId = req.params ? req.params.id : data._id;
        if (data.timestamp) data["timestamp"] = new Date().getTime();

        data["productname"] = replace(data.productname);
        return await productModel.update({ "_id": paramId }, { $set: data })
            .then(function (value) {
                return {
                    message: 'product update successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}



exports.deleteProduct = async function (query) {
    try {
        const data = await productModel.deleteOne(query);
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
    if (key) result = key.replace(/\s\s+/g, " ").trim().replace(/ /g, "-").trim();

    return result.toUpperCase()
}