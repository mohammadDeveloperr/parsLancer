const User=require('../models/users')

module.exports.login=async (req,res,next)=>{
    res.send({message:"hello in login page "})
 
}

module.exports.register=async (req,res,next)=>{
    try {
        const result=await User.create({...req.body});
        console.log(result)
    } catch (err) {
        console.log(err)
    }
    
    res.send({})
}