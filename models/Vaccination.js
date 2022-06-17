const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create vaccination model
class Vaccination extends Model { }

Vaccination.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pet_species:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        vaccine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vaccination_date:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Vaccination'
    }
);

module.exports = Vaccination