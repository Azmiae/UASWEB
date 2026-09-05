const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0, isInt: true }
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0, isInt: true }
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
