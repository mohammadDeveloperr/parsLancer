const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const Project = require("./projects")
const User = require("./users")

const Suggestion = sequelize.define("suggestion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    explain: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    }
});

Project.hasMany(Suggestion, {
    foreignKey: 'projectId'
});

User.hasMany(Suggestion, {
    foreignKey: 'employer_username'
});

User.hasMany(Suggestion, {
    foreignKey: 'freelancer_username'
});


module.exports = Suggestion