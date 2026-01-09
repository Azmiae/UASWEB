require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    
    await sequelize.authenticate();
    console.log('Database connected');

    require('./models/User'); 

    await sequelize.sync();
    console.log('Database synchronized');


    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🩺 Health check: http://localhost:${PORT}/health`);
    });

  } catch (error) {
    console.error('DB error:', error);
  }
})();
