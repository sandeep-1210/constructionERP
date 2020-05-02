const categoryModel = require('../../model/category');
const error = require('../../helper/error');


exports.addCategory = async function (obj) {
    try {
        const _categoryname = replace(obj.categoryname);
        const isExist = await categoryModel.findOne({ "categoryname": _categoryname });
        if (isExist) {
            throw new error.dublicateError('category name already exists')
        }

        obj.categoryname = _categoryname;
        return await categoryModel.create(obj)
            .then(function (value) {
                return {
                    message: 'category added successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}

exports.getCategoryById = async function (query) {
    try {
        const data = await categoryModel.findOne(query);
        if (data) {
            return { data, "code": 200 }
        }
        else {
            return {
                "message": "no data found for given id",
                "timestamp": new Date().getTime(),
                "code": 200
            }
        }
    }
    catch (ex) {
        throw ex;
    }
}

exports.getAllCategory = async function () {
    const data = await categoryModel.find().sort({"createdDate":-1});
    return { data, "code": 200 };
}

exports.updateCategory = async function (req) {
    try {
        let data = req.body;
        data.categoryname = replace(data.categoryname);         
        data["timestamp"] = new Date().getTime();
        return await categoryModel.update({ "_id": req.params.id }, { $set: data })
            .then(function (value) {
                return {
                    message: 'category updated successfully',
                    timestamp: new Date().getTime(),
                    "code": 200
                }
            });
    }
    catch (ex) {
        throw ex;
    }

}


exports.deleteCategory = async function (query) {
    try {
        const data = await categoryModel.deleteOne(query);
        if (data) {
            return { data, "code": 200 }
        }
        else {
            return {
                "message": "no data found for given id",
                "timestamp": new Date().getTime(),
                "code": 200
            }
        }
    }
    catch (ex) {
        throw ex;
    }
}

function replace(key) {
    let result = null;
    if(key) result = key.replace(/\s\s+/g, " ").trim().replace(/ /g, "-").trim();

    return result.toUpperCase()
}