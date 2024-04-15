const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Skill = sequelize.define("skill", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
});


module.exports = Skill