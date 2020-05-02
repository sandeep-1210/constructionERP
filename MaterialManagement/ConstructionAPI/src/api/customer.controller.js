const jwt = require('jsonwebtoken')
const services = require("../service/customer/index");
const errorHelper = require("../helper/error");

/*
    POST /api/customer/add    
*/

exports.addCustomer = async (req, res) => {
    let response = {};
    try {
        response = await services.addCustomer(req.body);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/customer/getAll  
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
    GET api/customer/get/:ID 
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


exports.getbyMobile = async (req, res) => {
    let response = {};
    try {
        response = await services.getbyMobile({ "mobile": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    PUT api/customer/update/:ID 
*/

exports.updateCustomer = async (req, res) => {
    let response = {};
    try {
        response = await services.updateCustomer(req);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}