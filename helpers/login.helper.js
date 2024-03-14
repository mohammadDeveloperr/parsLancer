const { setEvaluated } = require("ajv/dist/compile/util");
const { json } = require("sequelize");
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

module.exports.getUser = async (username = null) => {
  try {
    const select = {
      attributes: ["first_name", "last_name", "username", "email", "number"],
    };
    const condition = username ? { where: { username } } : {};
    const result = await User.findAll({ ...condition, ...select });
    // let users=JSON.stringify(result)
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUser = async (username, user) => {
  try {
    // Change everyone without a last name to "Doe"
    //TODO : توی اسکیما بگو نباید پسورد داشته باشه
    const result=await User.update(
      { ...user},
      {
        where: {
         username,
        },
      }
    );
    console.log(result)
    return result;

  } catch (err) {
    throw err;
  }
};


module.exports.getPassword=async (username)=>{
  try {
    let result = await User.findAll({attributes:["password"], where: { username }});
    return result[0].password;
  } catch (err) {
    throw err;
  }
}

module.exports.updatePassword=async (username,password)=>{
  try {
    const result=await this.updateUser(username,{password})
    console.log(result)
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports.getUsers = async () => {};
