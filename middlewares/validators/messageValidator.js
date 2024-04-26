const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas = require('../../schemas/messageSchema')



const messageValidator = async (req, res, next) => {
    try {
            //TODO you should good schema for get message

        let url = req.url
        let method = req.method
        let schema = ""
        let validate;
        let valid;
        if (url == '/message/' && (method == "POST" || method == "PUT")) {
            schema = schemas.addMessageSchema
            console.log(req.query)
            validate = ajv.compile(schema);
            valid = validate(req.body);
        }
        /*else if(url == '/message/' && method=="GET")
        {
            schema = schemas.getMessageSchema
            console.log(req.query)
            validate = ajv.compile(schema);
            valid = validate(req.query);
        }*/
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

module.exports = messageValidator;
