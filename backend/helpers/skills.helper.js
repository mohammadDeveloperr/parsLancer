const Skill = require("../models/skills")

const {Op}=require("sequelize")
module.exports.addSkill = async (skill) => {
    try {
        return await Skill.create(skill)

    } catch (err) {
        throw err;
    }
}

module.exports.getSkill = async (skillName=null) => {
    try {
        const condition = skillName ? { where: {...skillName} } : {};
        const result = await Skill.findAll({ ...condition });
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports.deleteSkill = async (skillName) => {
    try {
        const result = await Skill.destroy({
            where: {
                ...skillName,
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

        const result = await Skill.update(
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