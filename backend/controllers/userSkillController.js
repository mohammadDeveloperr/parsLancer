const Skill = require("../models/skills")
const helper = require("../helpers/userSkill.helper");
const skillHelper = require("../helpers/skills.helper")
const errors = require("../config/errors");

module.exports.getUserSkill = async (req, res, next) => {
  try {
    const param = req.query;
    const userSkills = await helper.getUserSkill(param);
    res.status(200).json({ userSkills });
  } catch (err) {
    next({ message: "پیدا کردن مهارت با مشکل مواجه شد", data: err });
  }
};

module.exports.addUserSkill = async (req, res, next) => {
  try {
//TODO چک اکسس و ولیدیتور نوشته شده تستش کن 


    const { skills } = req.body;
    const { username } = req.user
    let addUserSkill = []
    for (let skill of skills) {
      const foundSkill = await skillHelper.getSkill({ name: skill })
      if (!foundSkill[0]) {
        throw { message: "مهارت پیدا نشد ", statusCode: 403, data: "skill is not found" }
      }
      const checkSkill = await helper.getUserSkill({ skill, username });
      if (checkSkill[0]) {
        throw { message: "مهارت تکراری است ", statusCode: 403, data: "skill is found" }
      }
    }

    const result = await helper.addUserSkill(skills, username)

    console.log(result);
    res
      .status(200)
      .json({ message: "skill added successfully", statusCode: 200 });
  } catch (err) {
    console.log(err);
    next({ message: err.message || "اضافه کردن مهارت با مشکل مواجه شد", data: err.data || err, statusCode: err.statusCode || null });
  }
};

module.exports.updateUserSkill = async (req, res, next) => {
  try {
    const { skills } = req.body;
    const { username } = req.user
    for (let skill of skills) {
      const foundSkill = await skillHelper.getSkill({ name: skill })
      if (!foundSkill[0]) {
        throw { message: "مهارت پیدا نشد ", statusCode: 403, data: "skill is not found" }
      }
    }
    await helper.deleteUserSkill({ username })
    const result = await helper.addUserSkill(skills, username);
    console.log(result);
    res.status(200).json({ message: "مهارت  با موفقیت اپدیت شد" });
  } catch (err) {
    next({ message: err.message || "اپدیت مهارت با مشکل مواجه شد", data: err.data || err, statusCode: err.statusCode || null });
  }
};

module.exports.deleteUserSkill = async (req, res, next) => {
  try {

    const {username} = req.user;
    const skill = await helper.getUserSkill({username});
    if (!skill[0]) {
      throw { message: " مهارتی  وجود ندارد ", statusCode: 404, data: "skill not found" }
    }
    const result = await helper.deleteUserSkill({username});

    console.log(result);
    res.status(200).json({ message: "مهارت  با موفقیت حذف شد" });
  } catch (err) {
    if (err == "access denied") next(errors.accessDenyError);
    next({ message: err.message || "حذف مهارت با مشکل برخورد", statusCode: err.statusCode || null, data: err.data || "delte project have errore" })
  }
};