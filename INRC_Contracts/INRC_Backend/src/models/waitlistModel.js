const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const { v4: uuidv4 } = require('uuid');

const Waitlist = sequelize.define('Waitlist', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNo: {
        type: DataTypes.STRING,
    },
    subscribe: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Waitlist;
