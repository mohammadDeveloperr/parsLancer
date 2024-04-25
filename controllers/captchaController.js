
const errors = require("../config/errors");
const shared = require("../utils/shared");


const svgCaptcha = require('svg-captcha');
const uuid = require('uuid');
module.exports.getCaptcha = async (req, res, next) => {
  try {
    let captcha = svgCaptcha.create();
    const id = uuid.v4()
    console.log(captcha.text)
    await shared.redisModel.set(id,captcha.text);
      res.status(200).json({
        id,
        image: captcha.data
    });
  } catch (err) {
    next({ message: "سرویس کپچا به مشکل خورده است", data: err });
  }
};

module.exports.varifyCaptcha = async (req, res, next) => {
  try {

    const {id,captcha}=req.body;

    const oldCaptcha=await shared.redisModel.get(id, captcha);

    if(captcha!=oldCaptcha){
        throw "access denied"
    }
    
    res.status(200).json({statusCode:'200',message:"your varify is true"});
  } catch (err) {
    if (err == "access denied") next(errors.accessDenyError);
    next({ message: err.message || "اضافه کردن مهارت با مشکل مواجه شد", data: err.data || err, statusCode: err.statusCode || null });
  }
};
