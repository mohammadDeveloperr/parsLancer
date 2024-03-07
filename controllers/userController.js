const User=require('../models/users')
const bcrypt=require('bcryptjs');
module.exports.login=async (req,res,next)=>{
    res.send({message:"hello in login page "})
 
}

module.exports.register=async (req,res,next)=>{
    try {
       req.body.password= await bcrypt.hash(req.body.password, 8)
        const result=await User.create({...req.body});
        console.log(result)
        res.status(200).json({data:`کاربر ${req.body.username} با موفقیت ثبت نام شد`})
    } catch (err) {
        console.log(err)
        next({message:"ثبت نام کاربر به مشکل خورده است",data:err})
    }
}