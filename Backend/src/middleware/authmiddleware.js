const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('AUTH HEADER:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ada atau format salah' });
  }

  const token = authHeader.split(' ')[1];
  console.log('TOKEN:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT ERROR:', err.message);
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};
