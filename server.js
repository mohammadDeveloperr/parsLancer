const express = require('express')
const usersRouter=require('./routes/users')

const adminRouter=require('./routes/admin')
const projectRouter=require('./routes/project')
const suggestionRouter=require('./routes/suggestion')
const messageRouter=require('./routes/message')    //TODO : clean this routers to one require

const app = express()
const errorHandler=require("./middlewares/errors")
const {connectToDb}=require('./utils/database')
const morganMiddleware = require("./middlewares/morganLogger");
const logger = require("./utils/logger");
const dotEnv = require('dotenv');
const Redis = require("ioredis");
const redisModel=require("./models/redis")
const shared=require('./utils/shared')
dotEnv.config({ path: "./config/config.env" });


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
app.use('/users', usersRouter)
app.use('/admin', adminRouter)
app.use('/project', projectRouter)
app.use('/suggest', suggestionRouter)
app.use('/message', messageRouter)

app.use(errorHandler)


app.listen(process.env.port,()=>{
    logger.info(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.port}`);
})