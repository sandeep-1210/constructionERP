const User = require('../model/user')
const services = require("../service/user/index");
const errorHelper = require("../helper/error");

//POST /api/user/register

exports.register = async (req, res) => {
    let response = {};
    try {
        const username = req.decoded ? req.decoded.username : null;
        const isAdminExit = await services.get({ "username": username });
        const adminCount = await services.getAll();
        if ((isAdminExit && isAdminExit.admin === true) || (adminCount.length == 0) || isAdminExit == null) {
            // create a new user if does not exist
            response = await services.register(req.body);

        }
        else if (!isAdminExit) {
            response = {
                message: 'token expired',
                status: 'Log Out',
                timestamp: new Date().getTime(),
                "code": 401
            };
        }
        else {
            response = {
                message: 'does not have authorization to create new user',
                status: 'authorization Failed',
                timestamp: new Date().getTime(),
                "code": 403
            };
        }
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code ? response.code : 500;
    delete response['code'];
    res.status(code).send(response);
}

//GET /api/user/list

// exports.list = (req, res) => {
//     // refuse if not an admin
//     if(!req.decoded.admin) {
//         return res.status(403).json({
//             message: 'you are not an admin'
//         })
//     }

//     User.find({}, '-password').exec()
//     .then(
//         users=> {
//             res.json({                
//                 "count": users.length,
//                 users              
//             })            
//         }
//     )
// }


exports.list = async (req, res) => {
    let response = {};
    try {
        // refuse if not an admin
        if (!req.decoded.admin) {
            return res.status(403).json({
                message: 'you are not an admin'
            })
        }
        response = await services.getAllUser();
    }
    catch (err) {
        response = await errorHelper.errorObject(err);
    }
    const code = response.code;
    delete response['code'];
    res.status(code).send(response.data);
}


//POST /api/user/assign-admin/:username

exports.assignAdmin = (req, res) => {
    // refuse if not an admin
    if (!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.findOneByUsername(req.params.username)
        .then(
            user => {
                if (!user) throw new Error('user not found')
                user.assignAdmin()
            }
        ).then(
            res.json({
                success: true
            })
        ).catch(
            (err) => { res.status(404).json({ message: err.message }) }
        )
}


// POST /api/auth/changepassword

exports.changepassword = async (req, res) => {
    let response = {};
    try {
        data = req.body;
        response = await services.changepassword(data);
    }
    catch (ex) {
        response = error.prepareErrorObject(ex);
    }
    const code = response.code ? response.code : 500;
    delete response['code'];
    res.status(code).send(response);
}
