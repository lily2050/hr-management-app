const { sendSuccess, sendError } = require('../utils/responseHandler');
const { loginValidation, registerValidation } = require('../utils/validation');
const authService = require('../services/authService');
const User = require('../models/User');

const register = async (req, res, next) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error) {
      return sendError(res, 400, error.details[0].message);
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return sendError(res, 400, 'البريد الإلكتروني مستخدم بالفعل');
    }

    const { user, token } = await authService.register(value);
    sendSuccess(res, 201, { user, token }, 'تم التسجيل بنجاح');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginValidation(req.body);
    if (error) {
      return sendError(res, 400, error.details[0].message);
    }

    const { user, token } = await authService.login(value.email, value.password);
    sendSuccess(res, 200, { user, token }, 'تم تسجيل الدخول بنجاح');
  } catch (error) {
    sendError(res, 401, error.message);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user._id);
    sendSuccess(res, 200, null, 'تم تسجيل الخروج بنجاح');
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('department');
    sendSuccess(res, 200, user, 'تم استرجاع المستخدم بنجاح');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};
