const User = require('./User');
const Post = require('./Post');

module.exports = { User, Post };

//creating associations
User.hasMany( Vaccination, {
    foreignKey: 'user_id'
});

Vaccination.belongsTo(User, {
    foreignKey: 'user_id',
});