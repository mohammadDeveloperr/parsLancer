const shared = require("../utils/shared");
const errors = require("../config/errors")
module.exports = async (req, res, next) => {
  const path = req.path;
  const url = `${req.baseUrl}/`
  const method = req.method
  req.originalUrl = url
  const { token } = req.headers;
  const user = await shared.redisModel.get(token);
  //let url=req.originalUrl.substring(0, req.originalUrl.indexOf("?")) || req.originalUrl;

  if (user && (url == "/login/" || url == "/register/")) {
    next(errors.accessDenyError);
  }
  if (!user && (url == "/project/" || (url == "/users/" && method != "GET") || url == "/project/done/freelancer" || url == "/project/done/employer" ||
    url == "/suggest/" || url == "/message/" || url == "/skill/" || (url == "/userSkill/" && method != "GET") ||
    (url == "/projectSkill/" && method != "GET"))) {
    next(errors.accessDenyError);
  }
  if (user && (url == "/skill/") && user.role != "admin") {
    next(errors.accessDenyError)
  }
  req.user = user
  req.url = url;
  req.path = path
  next();
};
