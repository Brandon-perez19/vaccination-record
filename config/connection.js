//importing sequelize constructor 
const Sequelize = require('sequelize');

//importing .env to protect database info
require('dotenv').config();

//creating connection to database
const sequelize = new Sequelize('vaccination_db', 'root', '' , {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = sequelize