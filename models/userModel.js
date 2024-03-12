const { DataTypes} = require('sequelize');
const database = require('../configuration/database');

const User = database.define('user', {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
});

database.sync();

module.exports = User;
