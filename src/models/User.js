const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
    return User;
};
