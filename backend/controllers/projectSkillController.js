const Skill = require("../models/skills")
const helper = require("../helpers/projectSkill.helper");
const skillHelper = require("../helpers/skills.helper")
const errors = require("../config/errors");
const projectHelper=require("../helpers/projects.helper")
module.exports.getProjectSkill = async (req, res, next) => {
    try {
        const param = req.query;
        const projectSkills = await helper.getProjectSkill(param);
        res.status(200).json({ projectSkills });
    } catch (err) {
        next({ message: "پیدا کردن مهارت با مشکل مواجه شد", data: err });
    }
};

module.exports.addProjectSkill = async (req, res, next) => {
    try {


        const { projectId } = req.params
        const project = await projectHelper.getProject({id:projectId});
        if (!project[0]) {
            throw { message: "پروژه مورد نظر پیدا نشد ", statusCode: "404", data: "project not found" }
        }
        if(project[0].employer_username!=req.user.username &&req.user.role!='admin')throw "access denied"
        const { skills } = req.body;

        for (let skill of skills) {
            const foundSkill = await skillHelper.getSkill({ name: skill })
            if (!foundSkill[0]) {
                throw { message: "مهارت پیدا نشد ", statusCode: 403, data: "skill is not found" }
            }
            const checkSkill = await helper.getProjectSkill({ skill, projectId });
            if (checkSkill[0]) {
                throw { message: "مهارت تکراری است ", statusCode: 403, data: "skill is found" }
            }
        }

        const result = await helper.addProjectSkill(skills, projectId)

        console.log(result);
        res
            .status(200)
            .json({ message: "skill added successfully", statusCode: 200 });
    } catch (err) {
        if (err == "access denied") next(errors.accessDenyError);
        console.log(err);
        next({ message: err.message || "اضافه کردن مهارت با مشکل مواجه شد", data: err.data || err, statusCode: err.statusCode || null });
    }
};

module.exports.updateProjectSkill = async (req, res, next) => {
    try {
        const { projectId } = req.params
        const { skills } = req.body;
        
        const project = await projectHelper.getProject({id:projectId});
        if (!project[0]) {
            throw { message: "پروژه مورد نظر پیدا نشد ", statusCode: "404", data: "project not found" }
        }
        if(project[0].employer_username!=req.user.username)throw "access denied"
        for (let skill of skills) {
            const foundSkill = await skillHelper.getSkill({ name: skill })
            if (!foundSkill[0]) {
                throw { message: "مهارت پیدا نشد ", statusCode: 403, data: "skill is not found" }
            }
        }
        await helper.deleteProjectSkill({ projectId })
        const result = await helper.addProjectSkill(skills, projectId);
        console.log(result);
        res.status(200).json({ message: "مهارت  با موفقیت اپدیت شد" });
    } catch (err) {
        if (err == "access denied") next(errors.accessDenyError);
        next({ message: err.message || "اپدیت مهارت با مشکل مواجه شد", data: err.data || err, statusCode: err.statusCode || null });
    }
};

module.exports.deleteProjectSkill = async (req, res, next) => {
    try {
        const { projectId } = req.params        
        const project = await projectHelper.getProject({id:projectId});
        if (!project[0]) {
            throw { message: "پروژه مورد نظر پیدا نشد ", statusCode: "404", data: "project not found" }
        }
        if(project[0].employer_username!=req.user.username)throw "access denied"
        const skill = await helper.getProjectSkill({projectId});
        if (!skill[0]) {
            throw { message: "همچین مهارتی  وجود ندارد ", statusCode: 404, data: "skill not found" }
        }
        const result = await helper.deleteProjectSkill({projectId});

        console.log(result);
        res.status(200).json({ message: "مهارت  با موفقیت حذف شد" });
    } catch (err) {
        if (err == "access denied") next(errors.accessDenyError);
        next({ message: err.message || "حذف مهارت با مشکل برخورد", statusCode: err.statusCode || null, data: err.data || "delte project have errore" })
    }
};