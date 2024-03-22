const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Project = sequelize.define("project", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  explain: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  minPrice: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  maxPrice: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue:"pending"
  },
  
  employer_username:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  freelancer_username:{
    type:DataTypes.TEXT,
    allowNull: true,
  },
  employer_done:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:0
  },
  freelancer_done:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:0

  },
});;
module.exports=Project