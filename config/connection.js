// import the Sequelize constructor from the library
const Sequelize = require('sequelize');


// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize('vaccination_record_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
