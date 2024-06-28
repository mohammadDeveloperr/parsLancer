const Skill=require("../models/skills")
const helper = require("../helpers/skills.helper");

module.exports.getSkill = async (req, res, next) => {
    try {
      const skillName= req.query;
      const skills = await helper.getSkill(skillName);
      res.status(200).json({ skills });
    } catch (err) {
      next({ message: "پیدا کردن مهارت با مشکل مواجه شد", data: err });
    }
  };
  
  module.exports.addSkill = async (req, res, next) => {
    try {
      const skill = req.body;
      const checkSkill = await helper.getSkill(skill);
      if(checkSkill[0]){
        throw {message:"مهارت تکراری است ", statusCode:403,data:"skill is found"}
      }
      const result = await helper.addSkill(req.body);
      console.log(result);
      res
        .status(200)
        .json({ message: "skill added successfully", statusCode: 200 });
    } catch (err) {
      console.log(err);
      next({ message:err.message || "اضافه کردن مهارت با مشکل مواجه شد", data:err.data|| err,statusCode:err.statusCode||null });
    }
  };
  
  module.exports.updateSkill = async (req, res, next) => {
    try {
      const skillName = req.params;
      const skill = await helper.getSkill(skillName);
      if (!skill[0]) {
        throw {message:"مهارت پیدا نشد ",data:"skill not found",statusCode:404}
      }
      const newSkill = req.body;
      const checkSkill = await helper.getSkill(newSkill);
      if(checkSkill[0]){
        throw {message:"مهارت تکراری است ", statusCode:403,data:"skill is found"}
      }
      const result = await helper.updateSkill(skillName, newSkill);
      console.log(result);
      res.status(200).json({ message: "مهارت  با موفقیت اپدیت شد" });
    } catch (err) {
      next({ message:err.message|| "اپدیت مهارت با مشکل مواجه شد", data:err.data|| err,statusCode:err.statusCode||null });
    }
  };

  module.exports.deleteSkill = async (req, res, next) => {
    try {
      const skillName= req.params;
      const skill = await helper.getSkill(skillName);
      if(!skill[0]){
        throw {message:"همچین مهارتی  وجود ندارد ", statusCode:404,data:"skill not found"}
      }
      const result = await helper.deleteSkill(skillName);
  
      console.log(result);
      res.status(200).json({ message: "مهارت  با موفقیت حذف شد" });
    } catch (err) {
      next({message : err.message || "حذف مهارت با مشکل برخورد",statusCode:err.statusCode||null,data:err.data || "delte project have errore"}) 
    }
  };