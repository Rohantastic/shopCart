const { DataTypes} = require('sequelize');
const database = require('../configuration/database');

const order = database.define('order', {
    orderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    productName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    productDescription:{
        type: DataTypes.STRING,
        allowNull:false
    },
    productPrice:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
});

database.sync();

module.exports = order;
