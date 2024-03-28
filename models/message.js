const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const Project=require("./projects")
//TODO: بجای ایدی پروژه بیا ایدی پیشنهاد رو بزار
const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
  employer_username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  freelancer_username:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Project.hasMany(Message, {
    foreignKey: 'progectId'
  });
 
module.exports=Message