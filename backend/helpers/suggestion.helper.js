const Suggestion = require("../models/suggestion")
const Project = require("../models/projects")

const {Op}=require("sequelize")
module.exports.addSuggest = async (suggest) => {
    try {
        return await Suggestion.create(suggest)

    } catch (err) {
        throw err;
    }
}

module.exports.getSuggest = async (property) => {
    try {
        const condition = property ? { where: property } : {};
        const result = await Suggestion.findAll({ ...condition });
        return result;
    } catch (err) {
        throw err;
    }
};
module.exports.getSuggestWithProject = async (freelancer_username) => {
    try {
        const condition =  {where: freelancer_username } ;
        // const result = await Suggestion.findAll({ ...condition });

        const result = await Project.findAll({
            include: {
              model: Suggestion,
              ...condition
            }
      
          });
        return result;
    } catch (err) {
        throw err;
    }
};



module.exports.deleteSuggest = async (id) => {
    try {
        const result = await Suggestion.destroy({
            where: {
                id,
            },
        });
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
}



module.exports.deleteSuggestAfterAccept = async (id) => {
    try {
        const result = await Suggestion.destroy({
            where: {
                id:{
                    [Op.not]:id
                },
            },
        });
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports.updateSuggest = async (id, suggest) => {
    try {

        const result = await Suggestion.update(
            { ...suggest },
            {
                where: {
                    id,
                },
            }
        );
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
};