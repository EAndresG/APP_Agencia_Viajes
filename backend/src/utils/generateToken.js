const jwt = require('jsonwebtoken');

exports.generateToken = (userId, userType) => {
  return jwt.sign({ id: userId, userType }, process.env.JWT_SECRET, { expiresIn: '1d' });
};