const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email dan password wajib diisi'
        });
    }

    const user = await User.findOne({where: {email} });

    if (!user){
        return res.status(401).json({
            message: 'Email belum terdaftar'
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({
                message: 'Password Salah'
        });
    }
    const token = jwt.sign(
        {id : user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    );
    
        res.json({
            message: 'Login Berhasil',
            token

        })
    };
    module.exports={login};
