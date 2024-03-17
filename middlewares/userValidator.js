const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas=require('../models/schemas/userSchema')



const userValidator = async (req, res, next) => {
  try {
    let url=req.originalUrl
    let method=req.method
    let schema;
    if(url=='/users/register') schema=schemas.registerSchema
    else if(url=='/users/login')schema=schemas.loginSchema
    else if(url=='/users/' && method=="PUT")schema=schemas.updateUser
    else if(url=='/users/' && method=="PATCH")schema=schemas.updatePassword
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
