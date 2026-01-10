const User = require('../models/User');

const getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'email', 'role']
  });
  res.json({
    user
  });
};

const getAllUsers = async (req, res) => {
    const { page = 1, limit = 5, role} = req.query;

    const where ={};
    if (role) {where.role = role;
    
    const users = await User.findAndCountAll({
        where,
        attributes: ['id', 'email', 'role'],
        limit: parseInt(limit),
        offset: (page - 1) * limit,
    });

    res.json({
        total: users.count,
        page: parseInt(page),
        data: users.rows
    });
};
}
module.exports = { getProfile, getAllUsers };