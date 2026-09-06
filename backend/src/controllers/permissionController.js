const { sendSuccess, sendError } = require('../utils/responseHandler');
const Permission = require('../models/Permission');
const Employee = require('../models/Employee');

const getPermissions = async (req, res, next) => {
  try {
    const { employee, status, date, page = 1, limit = 10 } = req.query;
    let query = {};

    if (employee) query.employee = employee;
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const skip = (page - 1) * limit;
    const permissions = await Permission.find(query)
      .populate('employee')
      .populate('permissionType')
      .populate('approvedBy')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Permission.countDocuments(query);
    sendSuccess(res, 200, { permissions, total, page, limit });
  } catch (error) {
    next(error);
  }
};

const createPermission = async (req, res, next) => {
  try {
    const { outTime, returnTime } = req.body;
    
    const [outHour, outMin] = outTime.split(':');
    const [returnHour, returnMin] = returnTime.split(':');
    
    const outMinutes = parseInt(outHour) * 60 + parseInt(outMin);
    const returnMinutes = parseInt(returnHour) * 60 + parseInt(returnMin);
    const duration = returnMinutes - outMinutes;

    const permission = await Permission.create({
      ...req.body,
      duration
    });

    await permission.populate('employee').populate('permissionType');
    sendSuccess(res, 201, permission, 'تم تقديم طلب الإذن بنجاح');
  } catch (error) {
    next(error);
  }
};

const approvePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const permission = await Permission.findByIdAndUpdate(
      id,
      {
        status: 'approved',
        approvedBy: req.user._id,
        approvalDate: new Date(),
        notes
      },
      { new: true }
    ).populate('employee').populate('permissionType');

    if (!permission) {
      return sendError(res, 404, 'الإذن غير موجود');
    }

    // Update employee permission hours
    await Employee.findByIdAndUpdate(
      permission.employee._id,
      { $inc: { usedPermissionHours: permission.duration / 60 } }
    );

    sendSuccess(res, 200, permission, 'تم اعتماد الإذن');
  } catch (error) {
    next(error);
  }
};

const rejectPermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const permission = await Permission.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        approvedBy: req.user._id,
        approvalDate: new Date(),
        rejectionReason
      },
      { new: true }
    ).populate('employee').populate('permissionType');

    if (!permission) {
      return sendError(res, 404, 'الإذن غير موجود');
    }

    sendSuccess(res, 200, permission, 'تم رفض الإذن');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPermissions,
  createPermission,
  approvePermission,
  rejectPermission
};
