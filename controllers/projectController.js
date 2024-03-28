const Project = require("../models/projects");
const Message=require("../models/message")
const Suggestion=require("../models/suggestion")
const helper = require("../helpers/projects.helper");
const errors = require("../config/errors");

module.exports.getProject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const projects = await helper.getProject(id);
    res.status(200).json({ projects });
  } catch (err) {
    next({ message: "پیدا کردن کاربر با مشکل مواجه شد", data: err });
  }
};

module.exports.addProject = async (req, res, next) => {
  try {
    console.log(req.user.username);
    const result = await helper.addProject({
      ...req.body,
      employer_username: req.user.username,
    });

    console.log(result);
    res
      .status(200)
      .json({ message: "project added successfully", statusCode: 200 });
  } catch (err) {
    console.log(err);
    next({ message: "اضافه کردن پروژه با مشکل مواجه شد", data: err });
  }
};

module.exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const project = await helper.getProject(id);
    if (!project[0]) {
      throw "project not found";
    }
    if (
      project[0].employer_username !== req.user.username &&req.user.role != "admin") { 
        //!TODO : توی ارور ها یک ارور مخصوص این درست کردم وقت کردی اون رو بزار برای قانون dry
        throw "access denied";
    }

    const newProject = req.body;
    const result = await helper.updateProject(id, newProject);
    console.log(result);
    res.status(200).json({ message: "پروژه  با موفقیت اپدیت شد" });
  } catch (err) {
    if (err == "project not found") {
      next({
        statusCode: 404,
        message: "پروژه ای با این ایدی یافت نشد",
        data: "project not found",
      });
    }

    if (err == "access denied") next(errors.accessDenyError);
    next({ message: "اپدیت پروژه با مشکل مواجه شد", data: err });
  }
};

module.exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const project = await helper.getProject(id);
    if (!project[0]) {
      throw "project not found";
    }
    if (
      project[0].employer_username !== req.user.username &&
      req.user.role != "admin"
    ) {
      throw "access denied";
    }
    const result = await helper.deleteProject(id);

    console.log(result);
    res.status(200).json({ message: "پروژه  با موفقیت حذف شد" });
  } catch (err) {
    if (err == "project not found") {
      next({
        statusCode: 404,
        message: "پروژه ای با این ایدی یافت نشد",
        data: "project not found",
      });
    }

    if (err == "access denied") next(errors.accessDenyError);
    next({ message: "حذف کردن پروژه با مشکل مواجه شد", data: err });
  }
};

module.exports.freelancerStatus = async (req, res, next) => {  //this api for change project status by freelancer
  try {
    const { id } = req.query;
    const project = await helper.projectIsFound(id);
    if(project.status !="doing"){
      throw "access denied";
    }
    if (
      project.freelancer_username !== req.user.username &&req.user.role != "admin") {
      throw "access denied";
    }
    const isEmployerDone=project.employer_done?"true":false;
    let newProject;
    if(isEmployerDone){
      newProject={freelancer_done:1,status:"done"}
    }
    else{
      newProject={freelancer_done:1}
    }

    const result = await helper.updateProject(id, newProject);

    res.status(200).json({ message: "پروژه  با موفقیت اپدیت شد" });

  } catch (err) {
    if (err == "project not found") {
      next({statusCode: 404,message: "پروژه ای با این ایدی یافت نشد",data: "project not found",});
    }

    if (err == "access denied") next(errors.accessDenyError);
    next({ message: "اپدیت پروژه با مشکل مواجه شد", data: err });
  }
};

module.exports.employerStatus = async (req, res, next) => {  //this api for change project status by freelancer
  try {
    const { id } = req.query;
    const project = await helper.projectIsFound(id);
    if(project.status !="doing"){
      throw "access denied";
    }
    if (
      project.employer_username !== req.user.username &&req.user.role != "admin") {
      throw "access denied";
    }
    const isfreelancerDone=project.freelancer_done?"true":false;
    let newProject;
    if(isfreelancerDone){
      newProject={employer_done:1,status:"done"}
    }
    else{
      newProject={employer_done:1}
    }

    const result = await helper.updateProject(id, newProject);

    res.status(200).json({ message: "پروژه  با موفقیت اپدیت شد" });

  } catch (err) {
    if (err == "project not found") {
      next({statusCode: 404,message: "پروژه ای با این ایدی یافت نشد",data: "project not found",});
    }

    if (err == "access denied") next(errors.accessDenyError);
    next({ message: "اپدیت پروژه با مشکل مواجه شد", data: err });
  }
}
