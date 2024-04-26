const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas=require('../../schemas/adminSchema')



const adminValidator = async (req, res, next) => {
  try {
    let url=req.originalUrl.substring(0, req.originalUrl.indexOf("?"));
    let method=req.method
    let schema;
    if(url=='/admin/users/' && method=="PUT") schema=schemas.updateUser
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

module.exports =  adminValidator ;
