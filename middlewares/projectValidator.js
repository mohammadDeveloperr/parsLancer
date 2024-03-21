const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv)
require("ajv-errors")(ajv);

const schemas=require('../models/schemas/projectSchema')



const projectValidator = async (req, res, next) => {
  try {
    let url=req.originalUrl
    let method=req.method
    let schema=""
    if(url=='/project' && (method=="POST" || method=="PUT")) schema=schemas.addProjectSchema
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

module.exports =  projectValidator ;
