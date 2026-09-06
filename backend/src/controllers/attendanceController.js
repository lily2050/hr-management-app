const { sendSuccess, sendError } = require('../utils/responseHandler');
const Attendance = require('../models/Attendance');

const getAttendance = async (req, res, next) => {
  try {
    const { employee, date, status, page = 1, limit = 10 } = req.query;
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
    const attendance = await Attendance.find(query)
      .populate('employee')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(query);
    sendSuccess(res, 200, { attendance, total, page, limit });
  } catch (error) {
    next(error);
  }
};

const recordAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);
    await attendance.populate('employee');
    sendSuccess(res, 201, attendance, 'تم تسجيل الحضور بنجاح');
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('employee');

    if (!attendance) {
      return sendError(res, 404, 'سجل الحضور غير موجود');
    }

    sendSuccess(res, 200, attendance, 'تم تحديث سجل الحضور بنجاح');
  } catch (error) {
    next(error);
  }
};

const getTodayAttendance = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    }).populate('employee');

    const stats = {
      total: attendance.length,
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      leave: attendance.filter(a => a.status === 'leave').length,
      permission: attendance.filter(a => a.status === 'permission').length,
      mission: attendance.filter(a => a.status === 'mission').length
    };

    sendSuccess(res, 200, { attendance, stats });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAttendance,
  recordAttendance,
  updateAttendance,
  getTodayAttendance
};
