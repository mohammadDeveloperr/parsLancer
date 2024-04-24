const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const Skill = require("./skills")
const Project = require("./projects")

const projectSkill = sequelize.define("suggestion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }
});

Skill.hasMany(projectSkill, {
    foreignKey: 'skill'
});

Project.hasMany(projectSkill, {
    foreignKey: 'projectId'
});

module.exports = projectSkill