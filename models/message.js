const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const Suggestion=require("./suggestion")
const User=require("./users")
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
  owner: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
});

Suggestion.hasMany(Message, {
    foreignKey: 'suggestId'
  });

  User.hasMany(Suggestion, {
    foreignKey: 'employer_username'
});

User.hasMany(Suggestion, {
    foreignKey: 'freelancer_username'
});

 
module.exports=Message