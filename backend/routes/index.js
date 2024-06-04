const adminRouter=require('./admin')
const projectRouter=require('./project')
const suggestionRouter=require('./suggestion')
const messageRouter=require('./message')   
const skillRouter=require('./skill')    
const userSkill=require('./userSkill') 
const projectSkill=require('./projectSkill') 
const captchaRouter=require("./captcha")
const usersRouter=require('./users')
const AAARouter=require('./AAA')
const loginRouter=require("./login")
const registerRouter=require("./register")

module.exports={adminRouter,projectRouter,suggestionRouter,messageRouter,skillRouter,userSkill,projectSkill,captchaRouter,usersRouter,AAARouter,loginRouter,registerRouter}