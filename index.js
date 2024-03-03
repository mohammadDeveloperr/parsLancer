const express = require('express')
const usersRouter=require('./routes/users')
const app = express()


app.use(express.urlencoded({ extended: false }))




// ...

app.use('/users', usersRouter)

app.listen(3000,()=>{
    console.log('server is run on port 3000')
})