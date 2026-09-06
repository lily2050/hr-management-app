const { sendSuccess, sendError } = require('../utils/responseHandler');
const LeaveType = require('../models/LeaveType');

const getLeaveTypes = async (req, res, next) => {
  try {
    const leaveTypes = await LeaveType.find({ isActive: true });
    sendSuccess(res, 200, leaveTypes);
  } catch (error) {
    next(error);
  }
};

const createLeaveType = async (req, res, next) => {
  try {
    const leaveType = await LeaveType.create(req.body);
    sendSuccess(res, 201, leaveType, 'تم إنشاء نوع الإجازة بنجاح');
  } catch (error) {
    next(error);
  }
};

const updateLeaveType = async (req, res, next) => {
  try {
    const leaveType = await LeaveType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!leaveType) {
      return sendError(res, 404, 'نوع الإجازة غير موجود');
    }

    sendSuccess(res, 200, leaveType, 'تم تحديث نوع الإجازة بنجاح');
  } catch (error) {
    next(error);
  }
};

const deleteLeaveType = async (req, res, next) => {
  try {
    const leaveType = await LeaveType.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!leaveType) {
      return sendError(res, 404, 'نوع الإجازة غير موجود');
    }

    sendSuccess(res, 200, leaveType, 'تم حذف نوع الإجازة بنجاح');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType
};
