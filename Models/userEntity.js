const { DataTypes } = require('sequelize');
const bdd = require('../db.js');

const User = bdd.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    collection: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

module.exports = User;