const jwt = require('jsonwebtoken')
const User = require('../model/user')
const services = require("../service/user/index");
const errorHelper = require("../helper/error");

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/

exports.login = async (req, res) => {
    let response = {};
    try {
        response = await services.login(req.body, req.app.get('jwt-secret'));
    }
    catch (ex) {
        response = error.prepareErrorObject(ex);
    }
    const code = response.code ? response.code : 500;
    delete response['code'];
    res.status(code).send(response);
}

/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
} 