const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);

const schema=require('../models/schemas/userSchema')



const registerValidator = async (req, res, next) => {
  try {
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

module.exports = { registerValidator };
