const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas = require('../models/schemas/suggestionSchema')



const suggestionValidator = async (req, res, next) => {
    try {
        let url = req.url
        let method = req.method
        let schema = ""
        let validate;
        let valid;
        if (url == '/suggest/' && (method == "POST" || method == "PUT")) {
            schema = schemas.addSuggestSchema
            console.log(req.query)
            validate = ajv.compile(schema);
            valid = validate(req.body);
        }
        else if(url == '/suggest/' && method=="GET")
        {
            schema = schemas.getSuggestSchema
            console.log(req.query)
            validate = ajv.compile(schema);
            valid = validate(req.query);
        }
        console.log(valid);
        if (!valid) {
            console.log(validate.errors);
            throw validate.errors;
        }
        next();
    } catch (err) {
        console.log(err)
        next(err);
    }
};

module.exports = suggestionValidator;
