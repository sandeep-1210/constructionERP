const Joi = require('joi');

exports.productSchemas = Joi.object().keys({
    'productname': Joi.string().trim().required(),    
    'productcategory':  Joi.string().lowercase().trim().required(),
    'productsize':Joi.string().trim().when('productcategory', {
        is: 'iron road', then: Joi.string().trim().required().error(()=>{
            return {
                message : 'productsize is required when product category is iron road'
            };    
        }),
        otherwise: Joi.allow("").forbidden()
    }),
    'price1': Joi.string().trim().required(),
    'price2': Joi.string().strict().trim().allow(""),
    'price3':  Joi.string().strict().trim().allow(""),
    'purchaseprice': Joi.string().trim().required(),
    'suppliername': Joi.string().trim().required(),    
    'unitofmeasure': Joi.string().trim().required(),
    'quantity': Joi.string().trim().required()    
});


