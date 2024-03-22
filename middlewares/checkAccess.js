const shared = require("../utils/shared");
const errors=require("../config/errors")
module.exports = async (req, res, next) => {
  const { token } = req.headers;
  const user = await shared.redisModel.get(token);
  let url=req.originalUrl.substring(0, req.originalUrl.indexOf("?")) || req.originalUrl;
  req.originalUrl=url
  if (user && url =="/users/login" || url=="/users/register") {
    next(errors.accessDenyError) ;
  }
  if(!user && (url=="/project/" || url=="/project/done/freelancer" || url=="/project/done/employer") )
  {
    next(errors.accessDenyError) ;
  }
  req.user=user
  next();
};
