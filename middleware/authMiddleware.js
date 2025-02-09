const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Role-based authorization middleware
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.accountType !== role) {
      return res.status(403).json({ message: 'Unauthorized: Insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRole };
