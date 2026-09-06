const { sendSuccess, sendError } = require('../utils/responseHandler');
const Employee = require('../models/Employee');
const User = require('../models/User');

const getEmployees = async (req, res, next) => {
  try {
    const { department, search, page = 1, limit = 10 } = req.query;
    let query = {};

    if (department) query.department = department;

    const skip = (page - 1) * limit;
    const employees = await Employee.find(query)
      .populate('userId')
      .populate('department')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Employee.countDocuments(query);

    sendSuccess(res, 200, { employees, total, page, limit });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('userId')
      .populate('department')
      .populate('directManager');

    if (!employee) {
      return sendError(res, 404, 'الموظف غير موجود');
    }

    sendSuccess(res, 200, employee);
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    await employee.populate('userId').populate('department');
    sendSuccess(res, 201, employee, 'تم إنشاء الموظف بنجاح');
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId').populate('department');

    if (!employee) {
      return sendError(res, 404, 'الموظف غير موجود');
    }

    sendSuccess(res, 200, employee, 'تم تحديث الموظف بنجاح');
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return sendError(res, 404, 'الموظف غير موجود');
    }

    sendSuccess(res, 200, null, 'تم حذف الموظف بنجاح');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
