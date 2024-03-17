const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role:{
    type:DataTypes.TEXT,
    defaultValue:"user"
  },
  about_me: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});;
module.exports=User