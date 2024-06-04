const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const Skill = require("./skills")
const Project = require("./projects")

const ProjectSkill = sequelize.define("projectSkill", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }
});

Skill.hasMany(ProjectSkill, {
    foreignKey: 'skill'
});

Project.hasMany(ProjectSkill, {
    foreignKey: 'projectId'
});

module.exports = ProjectSkill