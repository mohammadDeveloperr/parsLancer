const Project = require("../models/projects");
const Message=require("../models/message")
const Suggestion=require("../models/suggestion")
const helper = require("../helpers/suggestion.helper");
const errors = require("../config/errors");
const projectHelper = require("../helpers/projects.helper");

module.exports.getSuggest = async (req, res, next) => {
    try {
      //TODO : create schema for this just acceppt id OR freelancer_username OR employer_username
      const suggestProperty= req.query;
      const suggests = await helper.getSuggest(suggestProperty);
      res.status(200).json({ suggests });
    } catch (err) {
      next({ message: "پیدا کردن پیشنهاد با مشکل مواجه شد", data: err });
    }
  };
  
  module.exports.addSuggest = async (req, res, next) => {
    try {
      const {projectId}=req.params
      const project=await projectHelper.getProject(projectId);
      if(!project){
        throw {message:"پروژه مورد نظر پیدا نشد ",statusCode:"404",data:"project not found"}
      }
        const freelancer_username=req.user.username
      console.log(req.user.username);
      const result = await helper.addSuggest({...req.body,projectId,freelancer_username,employer_username:project[0].employer_username});
  
      console.log(result);
      res
        .status(200)
        .json({ message: "project added successfully", statusCode: 200 });
    } catch (err) {
      console.log(err);
      next({ message:err.message || "اضافه کردن پروژه با مشکل مواجه شد", data:err.data|| err });
    }
  };
  
  module.exports.updateSuggest = async (req, res, next) => {
    try {
      const { id } = req.query;
      const suggest = await helper.getSuggest({id});
      if (!suggest[0]) {
        throw {message:"پیشنهاد پیدا نشد ",data:"suggest not found",statusCode:404}
      }
      if (
        suggest[0].freelancer_username !== req.user.username &&req.user.role != "admin") { 
          throw "access denied";
      }
  
      const newSuggest = req.body;
      const result = await helper.updateSuggest(id, newSuggest);
      console.log(result);
      res.status(200).json({ message: "پیشنهاد  با موفقیت اپدیت شد" });
    } catch (err) {
      if (err == "access denied") next(errors.accessDenyError);
      next({ message:err.message|| "اپدیت پیشنهاد با مشکل مواجه شد", data:err.data|| err,statusCode:err.statusCode||null });
    }
  };


  module.exports.acceptSuggest=async (req,res,next)=>{
    try {
      const { id } = req.query;
      const suggest = await helper.getSuggest({id});
      const {projectId,freelancer_username}=suggest[0]
      if (!suggest[0]) {
        throw {message:"پیشنهاد پیدا نشد ",data:"suggest not found",statusCode:404}
      }
      if (
        suggest[0].employer_username !== req.user.username &&req.user.role != "admin") { 
          throw "access denied";
      }
      const result = await helper.updateSuggest(id, {status:1});

      await helper.deleteSuggestAfterAccept(id)

      await projectHelper.updateProject(projectId,{status:"doing",freelancer_username} );

      res.status(200).json({ message: "پیشنهاد  با موفقیت قبول شد" });

  
    } catch (err) {
      if (err == "access denied") next(errors.accessDenyError);
      next({ message:err.message|| "اپدیت پیشنهاد با مشکل مواجه شد", data:err.data|| err,statusCode:err.statusCode||null });
  
    }
  }
  
  module.exports.deleteSuggest = async (req, res, next) => {
    try {
      const { id } = req.query;
      const {username}=req.user;
      const suggest = await helper.getSuggest({id});
      if(!suggest[0]){
        throw {message:"همچین پیشنهادی ای وجود ندارد ", statusCode:404,data:"suggest not found"}
      }
      if(suggest[0].freelancer_username!=username){
        throw "access denied"
      }
      const result = await helper.deleteSuggest(id);
  
      console.log(result);
      res.status(200).json({ message: "پیشنهاد  با موفقیت حذف شد" });
    } catch (err) {
      if (err == "access denied") next(errors.accessDenyError);
      next({message : err.message || "حذف پیشنهاد با مشکل برخورد",statusCode:err.statusCode||null,data:err.data || "delte project have errore"}) 
    }
  };