const ProjectSkill = require("../models/projectSkill")

const {Op}=require("sequelize")

module.exports.addProjectSkill = async (skills,projectId) => {
    try {
        let setSkill=[]
        for(let skill of skills){

            setSkill.push(ProjectSkill.create({skill,projectId}))
        }
        return Promise.all(setSkill)

    } catch (err) {
        throw err;
    }
}

module.exports.getProjectSkill = async (param) => {
    try {
        const condition = param ? { where: {...param} } : {};
        const result = await ProjectSkill.findAll({ ...condition });
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports.deleteProjectSkill = async (param) => {
    try {
        const result = await ProjectSkill.destroy({
            where: {
                ...param,
            },
        });
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
}



module.exports.updateSkill = async (skillName, skill) => {
    try {

        const result = await ProjectSkill.update(
            { ...skill },
            {
                where: {
                    ...skillName,
                },
            }
        );
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
};