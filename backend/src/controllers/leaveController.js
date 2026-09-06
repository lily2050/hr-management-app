const { sendSuccess, sendError } = require('../utils/responseHandler');
const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');
const LeaveType = require('../models/LeaveType');

const getLeaveRequests = async (req, res, next) => {
  try {
    const { employee, status, page = 1, limit = 10 } = req.query;
    let query = {};

    if (employee) query.employee = employee;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const leaveRequests = await LeaveRequest.find(query)
      .populate('employee')
      .populate('leaveType')
      .populate('approvedBy')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await LeaveRequest.countDocuments(query);
    sendSuccess(res, 200, { leaveRequests, total, page, limit });
  } catch (error) {
    next(error);
  }
};

const createLeaveRequest = async (req, res, next) => {
  try {
    const { employee, leaveType, startDate, endDate } = req.body;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leaveRequest = await LeaveRequest.create({
      ...req.body,
      days
    });

    await leaveRequest.populate('employee').populate('leaveType');
    sendSuccess(res, 201, leaveRequest, 'تم تقديم طلب الإجازة بنجاح');
  } catch (error) {
    next(error);
  }
};

const approveLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      id,
      {
        status: 'approved',
        approvedBy: req.user._id,
        approvalDate: new Date(),
        notes
      },
      { new: true }
    ).populate('employee').populate('leaveType');

    if (!leaveRequest) {
      return sendError(res, 404, 'طلب الإجازة غير موجود');
    }

    // Update employee leave balance
    await Employee.findByIdAndUpdate(
      leaveRequest.employee._id,
      { $inc: { usedAnnualLeave: leaveRequest.days } }
    );

    sendSuccess(res, 200, leaveRequest, 'تم اعتماد طلب الإجازة');
  } catch (error) {
    next(error);
  }
};

const rejectLeaveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        approvedBy: req.user._id,
        approvalDate: new Date(),
        rejectionReason
      },
      { new: true }
    ).populate('employee').populate('leaveType');

    if (!leaveRequest) {
      return sendError(res, 404, 'طلب الإجازة غير موجود');
    }

    sendSuccess(res, 200, leaveRequest, 'تم رفض طلب الإجازة');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeaveRequests,
  createLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest
};
