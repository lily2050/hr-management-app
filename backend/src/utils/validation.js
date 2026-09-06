const Joi = require('joi');

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().required()
  });
  return schema.validate(data);
};

const leaveRequestValidation = (data) => {
  const schema = Joi.object({
    employee: Joi.string().required(),
    leaveType: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    reason: Joi.string()
  });
  return schema.validate(data);
};

const permissionValidation = (data) => {
  const schema = Joi.object({
    employee: Joi.string().required(),
    date: Joi.date().required(),
    outTime: Joi.string().required(),
    returnTime: Joi.string().required(),
    permissionType: Joi.string().required(),
    reason: Joi.string()
  });
  return schema.validate(data);
};

module.exports = {
  loginValidation,
  registerValidation,
  leaveRequestValidation,
  permissionValidation
};
