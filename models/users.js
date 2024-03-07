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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  number: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});;
module.exports=User