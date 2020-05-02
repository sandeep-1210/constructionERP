
exports.errorObject = async function (err) {
    const error = errorHandler(err);
    return await {
        "error": {
            "message": error.message,
            "errorText": err.message,
            "timestamp": new Date().getTime()
        },
        code: error.statusCode
    }
}

exports.dublicateError = function (message) {
    return {
        "message": message,
        "timestamp": new Date().getTime(),
        statusCode: 200
    }
}

function errorHandler(err) {
    let message =   err.message ? err.message : "oops ! something went wrong";   
    let statusCode = err.statusCode ? err.statusCode : 404;

    if (err.name == "CastError" && err.kind == "ObjectId") {
        message = "no data found for given id";
        statusCode = 200;
    }

    if (err.name == "CastError" && err.kind == "number") {
        message = "Number Casting Error Occured While Excuting data";
        statusCode = 200;      
    }
    if (err.name == "ValidationError") {       
        message =   err.message ? err.message : "validation error for given payload"; 
        statusCode = 200;
    }
    // if (err.name == "MongoError") {
    //     message = err.message.split(' key: ')[1]
    //     message = message + " already exist use different one";
    //     statusCode = 200;
    // }

    return { "message": message, "statusCode": statusCode }
}