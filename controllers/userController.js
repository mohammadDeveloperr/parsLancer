const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkDbForLogin, getUser ,updateUser,updatePassword,getPassword} = require("../helpers/login.helper");
const shared = require("../utils/shared");
module.exports.login = async (req, res, next) => {
  try {
    const { username, password, email, first_name, last_name, number } =
      req.body;

    const user = await checkDbForLogin(username, password);
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw "نام کابری یا رمز عبور اشتباه میباشد";
    }

    const token = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
        },
      },
      process.env.JWT_SECRET
    );

    console.log(user);
    console.log(token);
    await shared.redisModel.set(
      token,
      { username, password, email, first_name, last_name, number },
      process.env.user_expire_time
    );
    res.status(200).json({ token });
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

module.exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.query;
    const users = await getUser(username);
    res.status(200).json({users});
  } catch (err) {
    next({ message: "پیدا کردن کاربر با مشکل مواجه شد", data: err });
  }
};

module.exports.updateUser=async (req,res,next)=>{
  try {
    const {username}=req.params;
    const newUser=req.body;

    const result=await updateUser(username,newUser)
    console.log(result);
    res.status(200).json({message:`کاربر ${username} با موفقیت اپدیت شد`});

  } catch (err) {
    next({ message: "پیدا کردن کاربر با مشکل مواجه شد", data: err });
  }
}

module.exports.updatePassword=async (req,res,next)=>{
  try {
    const { token } = req.headers;
    let {oldPassword,newPassword}=req.body;
    newPassword=await bcrypt.hash(newPassword, 8);
    const user =  await shared.redisModel.get(token);
    const password=await getPassword(user.username);
    const isEqual = await bcrypt.compare(oldPassword, password);

    if(!isEqual){
      throw {statusCode:401,message:"پسورد وارد اشتباه میباشد ",data:"wrong password"};
    }
    const result=await updatePassword(user.username,newPassword)
    console.log(result)
    res.status(200).json({message:"پسورد شما با موفقیت تغییر کرد"});


  } catch (err) {
    next({statusCode:err.statusCode||null, message: err.message ||"پسورد شما اپدیت نشد", data: err.data || err });

  }
}