//generates hash passwords to prevent leaks
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
//db connection
const sequelize = require('../config/connection');

//creating user model 
class User extends Model {
    //set up method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//defining table columns and configurations for User
User.init(
    {
        //column definitions
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //email column 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //password constraint. At least 8 characters
                len: [8]
            }
        }
    },
    {
        //table configuration options will go here
        //hashing password
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;