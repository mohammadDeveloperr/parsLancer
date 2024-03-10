const User = require("../models/users");
const { errorCreator } = require("../utils/error");

module.exports.checkDbForLogin = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw "نام کاربری یا رمز عبور اشتباه میباشد ";
    }
    return user;
  } catch (err) {
    throw err;
  }
};
