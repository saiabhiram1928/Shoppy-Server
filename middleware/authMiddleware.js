const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler.js')
const User = require('../models/user.js')

const authenticate = asyncHandler(async (req, res, next) => {
  let authHeader = req.headers['authorization'];
  if(authHeader) authHeader =  authHeader.split(' ')[1]
  let token = req.cookies.jwt || req.body.token || authHeader;
  console.log(req.body, "req body in auth " ,token)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { authenticate, admin };
