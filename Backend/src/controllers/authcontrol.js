const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res) =>{
    const { email, password, key } = req.body;

    if (!email || !password || !key) {
        return res.status(400).json({
            message: 'Email, Passowrd, dan key Wajib diisi'
        })
    }

    let role;

    if (key === process.env.ADMIN_KEY) {
        role = 'admin';
    } else if (key === process.env.STAFF_KEY) {
        role = 'staff';
    } else {
        return res.status(400).json({
            message: 'Key tidak valid'
        });
    }

    const existingUser = await User.findOne({ where: {email}});
    if (existingUser){
        return res.status(409).json({
            message: 'Email sudah terdaftar'
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        email,
        password: hashedPassword,
        role
    })
    res.status(201).json({
        message: 'Registrasi Berhasil',
        email: user.email,
        role: user.role
    });
};

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
        {id : user.id, 
        email: user.email,
        role: user.role
    },
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    );
    
        res.json({
            message: 'Login Berhasil',
            token

        })
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    };
    module.exports={login, register};
