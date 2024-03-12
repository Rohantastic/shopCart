const { DataTypes} = require('sequelize');
const database = require('../configuration/database');

const cart = database.define('cart', {
    cartID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

database.sync();

module.exports = cart;
