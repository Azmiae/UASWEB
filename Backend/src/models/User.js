const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'staff', 'user'),
        defaultValue: 'user'
    }
},{
    tableName: 'users',
    timestamps: false
});
module.exports = User;