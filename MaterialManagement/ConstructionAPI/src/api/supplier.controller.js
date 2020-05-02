const services = require("../service/supplier/index");
const errorHelper = require("../helper/error");

/*
    POST /api/supplier/add    
*/

exports.addSupplier = async (req, res) => {
    let response = {};
    try {
        response = await services.addSupplier(req.body);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/supplier/getAll  
*/

exports.getAllSupplier = async (req, res) => {
    let response = {};
    try {
        response = await services.getAllSupplier();
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET api/supplier/get/:ID 
*/

exports.getSupplierById = async (req, res) => {
    let response = {};
    try {
        response = await services.getSupplierById({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

/*
    PUT api/supplier/update/:ID 
*/

exports.updateSupplier = async (req, res) => {
    let response = {};
    try {
        response = await services.updateSupplier(req);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

// Delete api/supplier/delete/:ID 

exports.deleteSupplier = async (req, res) => {
    let response = {};
    try {
        response = await services.deleteSupplier({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}