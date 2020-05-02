const jwt = require('jsonwebtoken')
const services = require("../service/brand/index");
const errorHelper = require("../helper/error");

/*
    POST /api/brand/add    
*/

exports.addBrand = async (req, res) => {
    let response = {};
    try {
        response = await services.addBrand(req.body);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/brand/getAll  
*/

exports.getAll = async (req, res) => {
    let response = {};
    try {
        response = await services.getAll();
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/brand/get/:ID 
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
    PUT api/brand/update/:ID 
*/

exports.updateBrand = async (req, res) => {
    let response = {};
    try {
        response = await services.updateBrand(req);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}


// Delete api/brand/delete/:ID 

exports.deleteBrand = async (req, res) => {
    let response = {};
    try {
        response = await services.deleteBrand({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}