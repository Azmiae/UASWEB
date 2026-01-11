const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Transaksi = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('masuk', 'keluar'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'transactions',
  timestamps: true
});

module.exports = Transaksi;
