const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas=require('../models/schemas/userSchema')



const userValidator = async (req, res, next) => {
  try {
    console.log(req.originalUrl)
    schema=req.originalUrl=='/users/register'?schemas.registerSchema:schemas.loginSchema;
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
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

module.exports =  userValidator ;
