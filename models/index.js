const User = require('./User');
const Vaccination = require('./Vaccination');

module.exports = { User, Vaccination };

//creating associations
User.hasMany( Vaccination, {
    foreignKey: 'user_id'
});

Vaccination.belongsTo(User, {
    foreignKey: 'user_id',
});