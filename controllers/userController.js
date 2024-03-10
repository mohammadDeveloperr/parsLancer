const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { checkDbForLogin } = require("../helpers/login.helper");
const shared=require('../utils/shared')
module.exports.login = async (req, res, next) => {
  try {
    const { username, password ,email,first_name,last_name,number} = req.body;

    const user = await checkDbForLogin(username, password);
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw "نام کابری یا رمز عبور اشتباه میباشد";
    }

    const token = jwt.sign({
        user: {
            id: user._id,
            username:user.username,
            email: user.email,
            first_name: user.first_name,
        }
    }, process.env.JWT_SECRET)

    console.log(user)
    console.log(token)
    await shared.redisModel.set(token,{username, password ,email,first_name,last_name,number},process.env.user_expire_time)
    res.status(200).json({ token});
  } catch (err) {
    console.log(err);
    next({ message: "ثبت نام کاربر به مشکل خورده است", data: err });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const result = await User.create({ ...req.body });
    console.log(result);
    res
      .status(200)
      .json({ data: `کاربر ${req.body.username} با موفقیت ثبت نام شد` });
  } catch (err) {
    console.log(err);
    next({ message: "ثبت نام کاربر به مشکل خورده است", data: err });
  }
};
