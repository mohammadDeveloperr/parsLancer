

module.exports.errorCreator=(statusCode,message,data="")=>{
    const error=new Error(message)
    error.statusCode=statusCode
    error.data=data
    throw error
}