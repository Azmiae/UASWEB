const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.authenticate();

    const hashedPassword = await bcrypt.hash('123456',10);

    await User.create({
        email: 'gujimas@mail.com',
        password: hashedPassword 
    });
    console.log('User inserted with HashedPassword');
    process.exit();
    } catch (err) {
        console.error('Seed error:',err);
    }
})();
    