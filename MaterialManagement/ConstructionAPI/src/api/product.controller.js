const jwt = require('jsonwebtoken')
const services = require("../service/product/index");
const errorHelper = require("../helper/error");

/*
    POST /api/product/add    
*/

exports.addProduct = async (req, res) => {
    let response = {};
    try {
        response = await services.addProduct(req.body);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/product/getAll  
*/

exports.getAll = async (req, res) => {
    let response = {};
    try {
        response = await services.getAllWithCount();
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/product/get/:ID 
*/

exports.getById = async (req, res) => {
    let response = {};
    try {
        response = await services.get({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    PUT api/product/update/:ID 
*/

exports.updateProduct = async (req, res) => {
    let response = {};
    try {
        response = await services.updateProduct(req);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

// Delete api/product/delete/:ID 

exports.deleteProduct = async (req, res) => {
    let response = {};
    try {
        response = await services.deleteProduct({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}