const express = require('express')
const router=require("./routes/index")

const app = express()
const errorHandler=require("./middlewares/errors")
const {connectToDb}=require('./utils/database')
const morganMiddleware = require("./middlewares/morganLogger");
const logger = require("./utils/logger");
const dotEnv = require('dotenv');
const Redis = require("ioredis");
const redisModel=require("./models/redis")
const shared=require('./utils/shared')
var cors = require('cors')

dotEnv.config({ path: "./config/config.env" });

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

connectToDb();

const redis = new Redis();

redis.on("connect",()=>{
    logger.info("connected to redis")
    shared.redisModel=new redisModel(redis)
})
redis.on("error",(err)=>{
    logger.error(`Redis connection error : ${err}`)
    throw `Redis connection error : ${err}`;
})
// ...

app.use(morganMiddleware);
app.use('/users', router.usersRouter)
app.use('/admin', router.adminRouter)
app.use('/project', router.projectRouter)
app.use('/suggest', router.suggestionRouter)
app.use('/message', router.messageRouter)
app.use('/skill', router.skillRouter)
app.use('/userSkill', router.userSkill)
app.use('/projectSkill', router.projectSkill)
app.use('/captcha', router.captchaRouter)
app.use('/login', router.loginRouter)
app.use('/register', router.registerRouter)
app.use(errorHandler)


app.listen(process.env.port,()=>{
    logger.info(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.port}`);
})