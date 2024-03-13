const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecom','root','root',{
    dialect: 'mysql',
    host: 'localhost',
    charset: 'utf8mb4', 
    collate: 'utf8mb4_unicode_ci'
});


module.exports = sequelize;