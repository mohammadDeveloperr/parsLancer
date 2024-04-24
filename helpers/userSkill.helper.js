const UserSkill = require("../models/usersSkill")

const {Op}=require("sequelize")

module.exports.addUserSkill = async (skills,username) => {
    try {
        let setSkill=[]
        for(let skill of skills){

            setSkill.push(UserSkill.create({skill,username}))
        }
        return Promise.all(setSkill)

    } catch (err) {
        throw err;
    }
}

module.exports.getUserSkill = async (param) => {
    try {
        const condition = param ? { where: {...param} } : {};
        const result = await UserSkill.findAll({ ...condition });
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports.deleteUserSkill = async (param) => {
    try {
        const result = await UserSkill.destroy({
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

        const result = await UserSkill.update(
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