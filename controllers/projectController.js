const Project = require("../models/projects");
const helper = require("../helpers/projects.helper");


module.exports.getProject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const projects = await helper.getProject(id);
    res.status(200).json({projects});
  } catch (err) {
    next({ message: "پیدا کردن کاربر با مشکل مواجه شد", data: err });
  }
};


module.exports.addProject = async (req, res, next) => {
  try {

    const result = await helper.addProject(req.body);

    console.log(result);
    res.status(200).json({message:"project added successfully",statusCode:200});
  } catch (err) {
    console.log(err);
    next({ message: "اضافه کردن پروژه با مشکل مواجه شد", data: err });
  }
};

module.exports.updateProject=async (req,res,next)=>{
  try {
    const {id}=req.params;
    const newProject=req.body;
    const result=await helper.updateProject(id,newProject)
    console.log(result);
    res.status(200).json({message:"پروژه  با موفقیت اپدیت شد"});

  } catch (err) {
    next({ message: "اپدیت پروژه با مشکل مواجه شد", data: err });
  }
}

module.exports.deleteProject = async (req, res, next) => {
    try {
      const {id}=req.params;
      const result = await helper.deleteProject(id);
  
      console.log(result);
      res.status(200).json({message:"پروژه  با موفقیت حذف شد"});
    } catch (err) {
      console.log(err);
      next({ message: "حذف کردن پروژه با مشکل مواجه شد", data: err });
    }
  };
