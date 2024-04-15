const shared = require("../utils/shared");
const errors=require("../config/errors")
module.exports = async (req, res, next) => {
  const url1=req.baseUrl;
  const url2=req.path;
  console.log(url1)
  console.log(url2)
  const { token } = req.headers;
  const user = await shared.redisModel.get(token);
  //let url=req.originalUrl.substring(0, req.originalUrl.indexOf("?")) || req.originalUrl;
  const url=`${req.baseUrl}/`
  req.originalUrl=url
  if (user && url =="/users/login" || url=="/users/register") {
    next(errors.accessDenyError) ;
  }
  if(!user && (url=="/project/" || url=="/project/done/freelancer" || url=="/project/done/employer" || url=="/suggest/" || url=="/message/"|| url=="/skill/") )
  {
    next(errors.accessDenyError) ;
  }
  if(user &&(url=="/skill/")&& user.role!="admin")
  {
    next(errors.accessDenyError)
  }
  req.user=user
  req.url=url;
  next();
};
