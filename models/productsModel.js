const { DataTypes} = require('sequelize');
const database = require('../configuration/database');

const product = database.define('product', {
    productID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps:false
});

database.sync();

module.exports = product;
