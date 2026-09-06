const { sendSuccess, sendError } = require('../utils/responseHandler');
const Department = require('../models/Department');

const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({ isActive: true }).populate('manager');
    sendSuccess(res, 200, departments);
  } catch (error) {
    next(error);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    await department.populate('manager');
    sendSuccess(res, 201, department, 'تم إنشاء الإدارة بنجاح');
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('manager');

    if (!department) {
      return sendError(res, 404, 'الإدارة غير موجودة');
    }

    sendSuccess(res, 200, department, 'تم تحديث الإدارة بنجاح');
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!department) {
      return sendError(res, 404, 'الإدارة غير موجودة');
    }

    sendSuccess(res, 200, department, 'تم حذف الإدارة بنجاح');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
