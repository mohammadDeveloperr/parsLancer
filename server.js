const express = require('express')
const usersRouter=require('./routes/users')
const app = express()
const {errorHandler}=require("./middlewares/errors")
const {connectToDb}=require('./utils/database')
const morganMiddleware = require("./middlewares/morganLogger");
const logger = require("./utils/logger");
const dotEnv = require('dotenv');


dotEnv.config({ path: "./config/config.env" });


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

connectToDb();


// ...

app.use(morganMiddleware);
app.use('/users', usersRouter)


app.use(errorHandler)


app.listen(process.env.port,()=>{
    logger.info(`Server is running on ${process.env.NODE_ENV} mode on port ${process.env.port}`);
})