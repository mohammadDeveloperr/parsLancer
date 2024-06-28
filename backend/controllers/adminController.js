const {
  updateUser,
  deleteUser,
  getUser,
  getUserForAdmin,
} = require("../helpers/users.helper");

module.exports.updateUser = async (req, res, next) => {
  try {
    const { username } = req.query;
    const newUser = req.body;

    const result = await updateUser(username, newUser);
    console.log(result);
    res.status(200).json({ message: `کاربر ${username} با موفقیت اپدیت شد` });
  } catch (err) {
    if ((err.name = "SequelizeUniqueConstraintError"))
      next({
        message: "نام کاربری یا ایمیل یا شماره همراه تکراری میباشد",
        data: err,
      });

    next({ message: "پیدا کردن کاربر با مشکل مواجه شد", data: err });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const result = await deleteUser(username);
    console.log(result);
    res.status(200).json({ message: `کاربر ${username} با موفقیت حذف شد` });
  } catch (err) {
    next({ message: "حذف  کاربر با مشکل مواجه شد", data: err });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.query;
    const users = await getUserForAdmin(username);
    res.status(200).json({ users });
  } catch (err) {
    next({ message: "پیدا کردن کاربر با مشکل مواجه شد", data: err });
  }
};
