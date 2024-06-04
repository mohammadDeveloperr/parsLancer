const dotEnv=require('dotenv');
const {errorCreator}=require('./error')
const { Sequelize } =require('sequelize');
const logger = require("./logger");
dotEnv.config({ path: "./config/config.env" });

const sequelize = new Sequelize(process.env.DBName, process.env.DBUsername, process.env.DBPassword, {
    dialect: "mysql",
    host: "localhost",
  });

const connectToDb=async () => {
    try {
        await sequelize.sync({});
        logger.info("database is connected!")
    } catch (err) {
        throw errorCreator(500,"database can not connect",err)
    }
    
  }

module.exports={sequelize,connectToDb};



