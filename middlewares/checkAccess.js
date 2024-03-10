const shared = require("../utils/shared");

module.exports = async (req, res, next) => {
  const { token } = req.headers;
  const user = shared.redisModel.get(token);
  const url=req.originalUrl;
  if (user && url =="/users/login" || url=="/users/register") {
    next({statusCode:403,message:"access denied this user",data:"access denied"}) ;
  }
  next();
  console.log(req);
};
