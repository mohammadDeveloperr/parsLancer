const { setEvaluated, toHash } = require("ajv/dist/compile/util");
const { json } = require("sequelize");
const User = require("../models/users");
const { errorCreator } = require("../utils/error");
const bcrypt = require("bcryptjs");

module.exports.checkDbForLogin = async (username, password) => {
  try {
    const condition ={ where: { username } } ;
    const user = await User.findOne( condition );
    if (!user) {
      throw "نام کاربری یا رمز عبور اشتباه میباشد ";
    }
    return user.dataValues;
  } catch (err) {
    throw err;
  }
};

module.exports.getUser = async (username = null) => {
  try {
    const select = {
      attributes: [
        "first_name",
        "last_name",
        "username",
        "email",
        "number",
        "about_me",
      ],
    };
    const condition = username ? { where: { username } } : {};
    const result = await User.findAll({ ...condition, ...select });
    // let users=JSON.stringify(result)
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserForAdmin = async (username = null) => {
  try {
    const select = {
      attributes: [
        "first_name",
        "last_name",
        "username",
        "password",
        "email",
        "role",
        "number",
        "about_me",
      ],
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
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    // Change everyone without a last name to "Doe"
    //TODO : توی اسکیما بگو نباید پسورد داشته باشه
    const result = await User.update(
      { ...user },
      {
        where: {
          username,
        },
      }
    );
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteUser = async (username) => {
  try {
    const result = await User.destroy({
      where: {
        username,
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getPassword = async (username) => {
  try {
    let result = await User.findAll({
      attributes: ["password"],
      where: { username },
    });
    return result[0].password;
  } catch (err) {
    throw err;
  }
};

module.exports.updatePassword = async (username, password) => {
  try {
    const result = await this.updateUser(username, { password });
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getUsers = async () => {};
