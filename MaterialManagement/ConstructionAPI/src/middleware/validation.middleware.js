const Joi = require('joi');

const schemas = require("../helper/validation-schema");

exports.productValidation = (req, res, next) => {
    try {
        let data = req.body;
        const { error } = Joi.validate(data, schemas.productSchemas, { abortEarly: false });
        const valid = error == null;
        if (valid) next();
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(' ; ');
            throw message;
        }

    } catch (err) {        
        res.status(400).send({
            status: "error",
            message: err
        })
    }


};

exports.ciqIdValidation = (req, res, next) =>{
    try {
        let data = req.body['appianData'] ? req.body['appianData'] : req.body;
        app.debug("ciqIdValidation : ciq-id validation, ciq-id = ", data["ciq-id"]);
        const { error } = Joi.validate(data, schemas.appianSchemas, { abortEarly: false });
        const valid = error == null;
        if (valid) next();
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(' ; ');
            throw message;
        }
    } catch (err) {
        app.error("ciqIdValidation :ciq-id validation failed : ", JSON.stringify(err));
        res.status(400).send({
            status: "error",
            message: err
        })
    }
}

exports.updateOrdersValidation = (req, res, next) => {
    try{
        const data = req.body;
        app.debug('updateOrdersValidation : check for the ciq-id, augmentId, cascade-id : ', data);
        const {error} = Joi.validate(data, schemas.updateOrderSchema, { abortEarly: false });;
        const valid = error == null;
        if (valid) next();
        else{
            const { details } = error;
            const message = details.map(i => i.message).join(' ; ');
            throw message;
        }
    } catch (err) {
        app.error("updateOrdersValidation :payload validation failed, fields cannot be empty : ", JSON.stringify(err));
        res.status(400).send({
            status: "error",
            message: err
        })
    }
};
