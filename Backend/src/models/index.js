const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Transaction = require('./Transaction');

User.hasMany(Transaction, {foreignKey: 'userId'});
Transaction.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(Transaction, { foreignKey: 'productId' });
Transaction.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    User,
    Product,
    Transaction
};
