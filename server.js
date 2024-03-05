const express = require('express')
const usersRouter=require('./routes/users')
const app = express()
const {errorHandler}=require("./middlewares/errors")
const {connectToDb}=require('./utils/database')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

connectToDb();


// ...

app.use('/users', usersRouter)


app.use(errorHandler)


app.listen(3000,()=>{
    console.log('server is run on port 3000')
})