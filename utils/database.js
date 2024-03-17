const {errorCreator}=require('./error')
const { Sequelize } =require('sequelize');
const logger = require("./logger");
const sequelize = new Sequelize("parsLancer", "mohammad", "09944985072", {
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



