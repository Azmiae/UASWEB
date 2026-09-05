const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const allowedFields =['email'];

const getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'email', 'role']
  });
  res.json({
    user
  });
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, q } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (role) where.role = role;
    if (q) where.email = { [Op.like]: `%${q}%` };

    const { count, rows } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: ['id', 'email', 'role']
    });

    return res.json({
      total: count,
      page: parseInt(page),
      users: rows
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Gagal mengambil data user',
      error: err.message
    });
  }
};


const updateProfile = async (req, res) => {
    try{
    const update = {};

    for (let key of allowedFields) {
        if (req.body[key]) update[key] = req.body[key];
    }

    await User.update(update,{
        where: {id: req.user.id}
    });

    res.status(200).json({
        message : 'Profile Updated'})
    } catch (err){        
        res.status(500).json({ message: 'Gagal update profile' });
    }
};

    const gantipassword = async(req,res) => {
        const {oldPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);
        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match){
            return res.status(400).json({ message: 'Password lama salah' });
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        await user.update({ password: hashedPassword },
        );
        
        res.json({message: 'Password lama berhasil diubah'});
    };
module.exports = { getProfile, getAllUsers, updateProfile, gantipassword };