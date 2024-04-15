const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas = require('../models/schemas/skillSchema')



const schemaValidator = async (req, res, next) => {
    try {
        let url = req.url
        let method = req.method
        let schema = ""
        let validate;
        let valid;
        if (url == '/skill/' && (method == "POST" || method == "PUT")) {
            schema = schemas.addSkillSchema
            console.log(req.query)
            validate = ajv.compile(schema);
            valid = validate(req.body);
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

module.exports = schemaValidator;
