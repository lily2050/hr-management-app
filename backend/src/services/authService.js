const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const register = async (userData) => {
  const user = await User.create(userData);
  const token = generateToken(user._id);
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('بريد إلكتروني أو كلمة مرور غير صحيحة');
  }

  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new Error('بريد إلكتروني أو كلمة مرور غير صحيحة');
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);
  return { user, token };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { rememberToken: null });
};

module.exports = {
  generateToken,
  register,
  login,
  logout
};
