require('dotenv').config();

const sequelize = require('./config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('DB error:', error.message);
  }
})();
