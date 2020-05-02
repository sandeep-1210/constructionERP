const services = require("../service/category/index");
const errorHelper = require("../helper/error");

// POST /api/category/add  

exports.addCategory = async (req, res) => {
    let response = {};
    try {
        response = await services.addCategory(req.body);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

// GET api/category/getAll  

exports.getAllCategory = async (req, res) => {
    let response = {};
    try {        
        response = await services.getAllCategory();
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

// GET api/category/get/:ID 

exports.getCategoryById = async (req, res) => {
    let response = {};
    try {
        response = await services.getCategoryById({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

// PUT api/category/update/:ID 

exports.updateCategory = async (req, res) => {
    let response = {};
    try {
        response = await services.updateCategory(req);
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}

// Delete api/category/delete/:ID 

exports.deleteCategory = async (req, res) => {
    let response = {};
    try {
        response = await services.deleteCategory({ "_id": req.params.id });
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response);
}