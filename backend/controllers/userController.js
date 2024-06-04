const User = require("../models/users");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkDbForLogin, getUser ,updateUser,updatePassword,getPassword} = require("../helpers/users.helper");
const shared = require("../utils/shared");
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } =
      req.body;

    const user = await checkDbForLogin(username, password);
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw {statusCode:401,message:"نام کابری یا رمز عبور اشتباه میباشد",data:"wrong password"};
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

    const {email,number,role,first_name,last_name}=user;
    console.log(user);
    console.log(token);
    await shared.redisModel.set(
      token,
      { username, password, email, first_name, last_name, number,role },
      process.env.user_expire_time
    );
    res.status(200).json({ token });
  } catch (err) {
    next({ message:err.message|| "لاگین کاربر به مشکل خورده است", data:err.data|| err,statusCode:err.statusCode||null });
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
    if(err.name="SequelizeUniqueConstraintError")
    next({ message: "نام کاربری یا ایمیل یا شماره همراه تکراری میباشد", data: err });

    next({ message:err.message|| "ثبت نام کاربر به مشکل خورده است", data:err.data|| err,statusCode:err.statusCode||null });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.query;
    const users = await getUser(username);
    res.status(200).json({users});
  } catch (err) {
    next({ message:err.message|| "پیدا کردن کاربر با مشکل مواجه شد", data:err.data|| err,statusCode:err.statusCode||null });
  }
};

module.exports.updateUser=async (req,res,next)=>{
  try {
    const { token } = req.headers;
    const newUser={first_name,last_name,}=req.body;
    const {username} =  await shared.redisModel.get(token);
    const result=await updateUser(username,newUser)
    console.log(result);
    res.status(200).json({message:`کاربر ${username} با موفقیت اپدیت شد`});

  } catch (err) {
    next({ message:err.message|| "بروزرسانی کردن کاربر با مشکل مواجه شد", data:err.data|| err,statusCode:err.statusCode||null });

  }
}


module.exports.updatePassword=async (req,res,next)=>{
  try {
    const { token } = req.headers;
    let {oldPassword,newPassword}=req.body;
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
    next({ message:err.message||"پسورد شما اپدیت نشد", data:err.data|| err,statusCode:err.statusCode||null });
  }
}