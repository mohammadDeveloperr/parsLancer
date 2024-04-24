const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const Skill = require("./skills")
const User = require("./users")

const UserSkill = sequelize.define("userSkill", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }
});

Skill.hasMany(UserSkill, {
    foreignKey: 'skill'
});

User.hasMany(UserSkill, {
    foreignKey: 'username'
});

module.exports = UserSkill